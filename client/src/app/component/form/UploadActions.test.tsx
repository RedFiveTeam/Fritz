import { UploadActions } from './UploadActions';
import { UploadRepository } from './repositories/UploadRepository';
import { UploadStore } from './UploadStore';
import { StubUploadRepository } from './repositories/StubUploadRepository';
import { UploadModel } from './UploadModel';

describe('UploadActions', () => {
  let subject: UploadActions;
  let uploadRepository: UploadRepository;
  let uploadStore: UploadStore;

  beforeEach(() => {
    uploadRepository = new StubUploadRepository();

    uploadRepository.upload = jest.fn(() => {
      return new UploadModel('chucknorris.ppt');
    });

    uploadStore = new UploadStore();
    subject = new UploadActions({uploadRepository} as any, {uploadStore} as any);
  });

  it('should pass the file to the backend', async () => {
    const file = new File(['(⌐□_□)'], 'chucknorris.ppt', {type: 'application/vnd.ms-powerpoint'});
    await subject.upload({file: file});
    expect(uploadRepository.upload).toHaveBeenCalledWith({file: file});
    expect(uploadStore.uploaded).toBeTruthy();
    expect(uploadStore.fileName).toBe('chucknorris.ppt');
  });

});