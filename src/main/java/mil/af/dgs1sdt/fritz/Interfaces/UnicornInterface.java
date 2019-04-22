package mil.af.dgs1sdt.fritz.Interfaces;

import mil.af.dgs1sdt.fritz.Models.MissionModel;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UnicornInterface {

  public List<MissionModel> getMissions() throws Exception {
    List<MissionModel> missionList = new ArrayList<>();
    SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");

    String now = sdf.format(new Date());
    String yesterday = sdf.format(new Date(System.currentTimeMillis() - (48 * 60 * 60 * 1000)));

    String uri = "https://codweb1.leidoshost.com/UNICORN.NET/WebServices/UnicornMissionWebServicesV2" +
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
        missionList.add(mission);
      }
    }
    return missionList;
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
}