package mil.af.dgs1sdt.fritz.Interfaces;

import mil.af.dgs1sdt.fritz.Models.CalloutModel;
import mil.af.dgs1sdt.fritz.Models.MissionModel;
import mil.af.dgs1sdt.fritz.Models.ReleasabilityModel;
import org.apache.commons.io.FileUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;

public class UnicornInterface {

  private String unicornBaseURL = System.getenv("UNICORN_URL");

  public List<MissionModel> getMissions() throws Exception {
    List<MissionModel> missionList = new ArrayList<>();
    SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");

    String now = sdf.format(new Date());
    String yesterday = sdf.format(new Date(System.currentTimeMillis() - (48 * 60 * 60 * 1000)));

    String uri = unicornBaseURL + "/WebServices/UnicornMissionWebServicesV2" +
      ".asmx/GetMissionMetaDataRest?keyword=&start=" + yesterday + "&end=" + now + "&latitude=&longitude=&radius=";
    Document doc = makeRequest(uri);
    NodeList missions = doc.getElementsByTagName("missionMetaData");
    for (int i = 0; i < missions.getLength(); i++) {
      Node element = missions.item(i);
      if (element.getNodeType() == Node.ELEMENT_NODE) {
        Element ele = (Element) element;
        MissionModel mission = new MissionModel();
        mission.setStartTime(ele.getElementsByTagName("startdttime").item(0).getTextContent());
        mission.setId(ele.getElementsByTagName("missionid").item(0).getTextContent());
        mission.setCallsign(ele.getElementsByTagName("callsign").item(0).getTextContent());
        mission.setDescription(ele.getElementsByTagName("description").item(0).getTextContent());
        mission.setStatus(ele.getElementsByTagName("missionStatus").item(0).getTextContent());
        mission.setOrg(ele.getElementsByTagName("primaryorg").item(0).getTextContent().replace('-', ' '));
        mission.setPlatform(ele.getElementsByTagName("platform").item(0).getTextContent());
        missionList.add(mission);
      }
    }
    return missionList;
  }

  public List<CalloutModel> getCallouts(String missionId) throws Exception {
    List<CalloutModel> targets = new ArrayList<>();
    String uri = unicornBaseURL + "/WebServices/PMSServicesReltoNF" +
      ".asmx/GetPMSTargetInfo?ato=&missionID=" + missionId + "&atoDay=";
    Document doc = makeRequest(uri);
    NodeList t = doc.getElementsByTagName("target");
    DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.S");
    for (int i = 0; i < t.getLength(); i++) {
      Node element = t.item(i);
      if (element.getNodeType() == Node.ELEMENT_NODE) {
        Element ele = (Element) element;
        CalloutModel target = new CalloutModel();
        target.setName(ele.getElementsByTagName("targetName").item(0).getTextContent());
        target.setClassification(ele.getElementsByTagName("classification").item(0).getTextContent());
        target.setReleasability(ele.getElementsByTagName("releasability").item(0).getTextContent());
        target.setActivity(ele.getElementsByTagName("targetActivity").item(0).getTextContent());
        target.setEventId(ele.getElementsByTagName("targetEventID").item(0).getTextContent());
        Date date = df.parse(ele.getElementsByTagName("tot").item(0).getTextContent());
        long time = (long) date.getTime() / 1000;
        target.setTot(time);
        targets.add(target);
      }
    }
    return targets;
  }

  public List<ReleasabilityModel> getReleasabilities() throws Exception {
    List<ReleasabilityModel> releasabilities = new ArrayList<>();
    String uri = unicornBaseURL + "/WebServices/UnicornData.asmx/GetReleasabilities";
    Document doc = makeRequest(uri);
    NodeList r = doc.getElementsByTagName("RELEASABILITY");
    for (int i = 0; i < r.getLength(); i++) {
      Node element = r.item(i);
      if (element.getNodeType() == Node.ELEMENT_NODE) {
        Element ele = (Element) element;
        ReleasabilityModel releasability = new ReleasabilityModel();
        releasability.setReleasabilityId(ele.getElementsByTagName("RELEASABILITY_ID").item(0).getTextContent());
        releasability.setReleasabilityName(ele.getElementsByTagName("RELEASABILITY_NAME_TXT").item(0).getTextContent());
        releasabilities.add(releasability);
      }
    }
    return releasabilities;
  }

  public Document makeRequest(String uri) throws Exception {
    URL url = new URL(uri);
    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
    connection.setRequestMethod("GET");
    connection.setRequestProperty("Accept", "application/xml");

    InputStream xml = connection.getInputStream();

    DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
    DocumentBuilder db = dbf.newDocumentBuilder();
    return db.parse(xml);
  }

  public String makePostRequest(String uri, List<NameValuePair> params) throws Exception {
    CloseableHttpClient client = HttpClients.createDefault();
    HttpPost httpPost = new HttpPost(uri);
    httpPost.setEntity(new UrlEncodedFormEntity(params));
    CloseableHttpResponse response = client.execute(httpPost);
    String result = EntityUtils.toString(response.getEntity());
    client.close();
    return result;
  }

  public static String convertFileToBase64(File file) throws IOException {
    byte[] content = FileUtils.readFileToByteArray(file);
    return Base64.getEncoder().encodeToString(content);
  }
}