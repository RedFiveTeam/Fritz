import { SlidesActions } from './SlidesActions';
import { SlidesStore } from '../store/SlidesStore';
import { SlideModel } from '../models/SlideModel';
import { UploadStore } from '../../form/upload/UploadStore';
import { UnicornStore } from '../../unicorn/store/UnicornStore';
import { MissionModel } from '../../unicorn/model/MissionModel';

describe('SlidesActions', () => {
  let subject: SlidesActions;
  let slidesStore: SlidesStore;
  let uploadStore: UploadStore;
  let metricActions: any;
  let unicornStore: UnicornStore;

  metricActions = {
    trackMetric: jest.fn(() => {
      return Promise.resolve();
    }),
    updateMetric: jest.fn(() => {
      return Promise.resolve();
    })
  };

  beforeEach(() => {
    uploadStore = new UploadStore();
    slidesStore = new SlidesStore();
    uploadStore.setHash('ewerwerw');

    slidesStore.setSlides([
      new SlideModel('test', 'test'),
      new SlideModel('test2', 'test2'),
      new SlideModel('test3', 'test3'),
      new SlideModel('test4', 'test4'),
      new SlideModel('test5', 'test5'),
      new SlideModel('test6', 'test6')
    ]);

    slidesStore.slides.map((s: SlideModel) => {
      s.setDate(new Date(2019, 6, 10));
    });

    metricActions.trackMetric = jest.fn();
    unicornStore = new UnicornStore();
    unicornStore.setActiveMission(new MissionModel('', '', 'Stephen 14', '', '', '', ''));
    subject = new SlidesActions({} as any, {slidesStore, uploadStore, unicornStore} as any);
    subject.metricActions = metricActions;
  });

  it('should set initial validation on download action', async () => {
    expect(slidesStore.hasInitiallyValidated).toBeFalsy();

    await subject.trackRenameAndDownload();
    expect(slidesStore.initialValidation).toBeTruthy();
  });

  it('should update the date and validateInput on date change after initial validation', () => {
    slidesStore.validate = jest.fn();
    subject.setDateFromInput({target: {value: '2019-05-21'}});
    expect(slidesStore.validate).not.toHaveBeenCalled();

    slidesStore.initialValidation();
    subject.setDateFromInput({target: {value: '2019-05-21'}});
    expect(slidesStore.fullDate).toBe('2019-05-21');
    expect(slidesStore.validate).toHaveBeenCalled();
  });

  it('should update the op name and validateInput on change after initial validation', () => {
    slidesStore.validate = jest.fn();
    subject.setAndUpdateOpName({target: {value: 'operation'}});
    expect(slidesStore.validate).not.toHaveBeenCalled();

    slidesStore.initialValidation();
    subject.setAndUpdateOpName({target: {value: 'operation'}});
    expect(slidesStore.opName).toBe('operation');
    expect(slidesStore.validate).toHaveBeenCalled();
  });

  it('should update the date after extraction', () => {
    subject.setDateFromStatus('21MAY19');
    expect(slidesStore.fullDate).toBe('2019-05-21');
  });

  it('update the slide model name when called', () => {

    subject.setAndUpdateActivity(slidesStore.slides[0], {target: {value: 'Test activity'}});
    expect(slidesStore.slides[0].newName).toBe('DDTTTTZMONYY_TGT_NAME_TEST_ACTIVITY_ASSET_RELEASABILITY');

    subject.setDateFromInput({target: {value: '2019-01-20'}});
    expect(slidesStore.slides[1].newName).toBe('20TTTTZJAN19_TGT_NAME_ACTY_ASSET_RELEASABILITY');

    subject.setAndUpdateOpName({target: {value: 'op hello'}});
    expect(slidesStore.slides[2].newName).toBe('20TTTTZJAN19_OP_HELLO_ACTY_ASSET_RELEASABILITY');

    subject.setAndUpdateAsset({target: {value: 'asset'}});
    expect(slidesStore.slides[3].newName).toBe('20TTTTZJAN19_OP_HELLO_ACTY_ASSET_RELEASABILITY');

    subject.setAndUpdateReleasability('fvey');
    expect(slidesStore.slides[4].newName).toBe('20TTTTZJAN19_OP_HELLO_ACTY_ASSET_FVEY');

    subject.setAndUpdateTime(slidesStore.slides[5], {target: {value: '1234'}});
    expect(slidesStore.slides[5].newName).toBe('201234ZJAN19_OP_HELLO_ACTY_ASSET_FVEY');
  });

  it('should log metrics on download if form is valid & slides were uploaded', async () => {
    let fieldValidationMock = jest.fn();
    fieldValidationMock.mockReturnValue(true);
    slidesStore.validate = fieldValidationMock;
    uploadStore.setUploaded(true);
    await subject.trackRenameAndDownload();
    expect(metricActions.trackMetric).toHaveBeenCalled();
  });

  it('should not log metrics on download if form is invalid', async () => {

    await subject.trackRenameAndDownload();
    expect(metricActions.trackMetric).not.toHaveBeenCalled();
  });

  it('should refuse download if form is invalid', async () => {
    let downloadSpy = jest.fn();
    subject.download = downloadSpy;
    await subject.trackRenameAndDownload();
    expect(downloadSpy).not.toHaveBeenCalled();
  });

  it('should download if form is valid', async () => {
    let fieldValidationMock = jest.fn();
    fieldValidationMock.mockReturnValue(true);
    slidesStore.validate = fieldValidationMock;
    uploadStore.setUploaded(true);
    let downloadSpy = jest.fn();
    subject.download = downloadSpy;

    await subject.trackRenameAndDownload();
    expect(downloadSpy).toHaveBeenCalled();
  });

  it('should keep placeholder text if any date values are not selected', () => {
    subject.setDateFromInput({target: {value: '20'}});
    expect(slidesStore.month).toBe('MON');
    expect(slidesStore.day).toBe('DD');
    expect(slidesStore.year).toBe('YY');
  });

  it('should trigger toast when trying to download without an upload', async () => {
    let triggerUploadToastSpy = jest.fn();
    subject.triggerMustUploadFirstToast = triggerUploadToastSpy;
    uploadStore.setUploaded(false);
    await subject.trackRenameAndDownload();
    expect(triggerUploadToastSpy).toHaveBeenCalled();
  });

  it('should trigger a Please Wait toast when download attempted while converting', async () => {
    let triggerConversionToastSpy = jest.fn();
    subject.triggerMustFinishConversionToast = triggerConversionToastSpy;

    uploadStore.setUploaded(false);
    uploadStore.setUploading(true);
    await subject.trackRenameAndDownload();
    expect(triggerConversionToastSpy).toHaveBeenCalled();
  });

  it('should update slides store with a pre-made date from Status', () => {
    subject.setDateFromStatus('10MAY19');
    expect(slidesStore.year).toBe('19');
    expect(slidesStore.month).toBe('MAY');
    expect(slidesStore.day).toBe('10');
  });

  it('should compare Callsign & selected Mission', () => {
    slidesStore.setAsset('Stephen 13');
    subject.compareCallsigns();
    expect(slidesStore.differentAsset).toBeTruthy();

    slidesStore.setAsset('Stephen 14');
    subject.compareCallsigns();
    expect(slidesStore.differentAsset).toBeFalsy();
  });

  it('should update selected mission and compare callsigns', () => {
    subject.compareCallsigns = jest.fn();
    subject.updateMission(new MissionModel('', '', 'Stephen Change', '', '', '', ''));
    expect(subject.compareCallsigns).toHaveBeenCalled();
  });

  it('should determine mismatch callsign always but only validateInput empty callsign after initial validation', () => {
    slidesStore.validate = jest.fn();

    subject.setAndUpdateAsset({target: {value: 'asset'}});
    expect(slidesStore.validate).not.toHaveBeenCalled();
    expect(slidesStore.differentAsset).toBeTruthy();

    slidesStore.initialValidation();
    subject.setAndUpdateAsset({target: {value: 'Stephen 14'}});
    expect(slidesStore.validate).toHaveBeenCalled();
    expect(slidesStore.differentAsset).toBeFalsy();
  });

  it('should validateInput releasability always on change', () => {
    expect(slidesStore.isValidReleasability).toBeFalsy();
    subject.setAndUpdateReleasability('releaseMe');
    expect(slidesStore.isValidReleasability).toBeTruthy();
  });

  it('should set and update time', () => {
    subject.setAndUpdateTime(slidesStore.slides[0], {target: {value: '1234'}});
    expect(slidesStore.slides[0].time).toBe('1234');
  });

  it('should change the name using the slide when the slide date has been edited', () => {
    slidesStore.slides[0].setDateEdited(true);
    slidesStore.slides[0].setDate(new Date(2019, 1, 1));
    slidesStore.slides[1].setDateEdited(true);
    slidesStore.slides[1].setDate(new Date(2019, 2, 2));
    subject.updateNewNames();
    expect(slidesStore.slides[0].newName).toBe('01TTTTZFEBYY_TGT_NAME_ACTY_ASSET_RELEASABILITY');
    expect(slidesStore.slides[1].newName).toBe('02TTTTZMARYY_TGT_NAME_ACTY_ASSET_RELEASABILITY');
  });
});