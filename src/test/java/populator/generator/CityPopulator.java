package populator.generator;

import com.trendocean.BaseLocalIntegrationTestCase;
import com.trendocean.domain.City;
import com.trendocean.service.db.ICityDBService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.List;

public class CityPopulator extends BaseLocalIntegrationTestCase {


    @Autowired
    ICityDBService cityDBService;

    @Test
    @Transactional
    public void populateCities(){
        List<City> cities=cityDBService.getAll();
        cityDBService.removeAll(cities);
        readCitiesAndPersistDB();
    }

    private void readCitiesAndPersistDB() {

        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ";";

        try {

            InputStream in = getClass().getResourceAsStream("/cities.csv");
            br = new BufferedReader(new InputStreamReader(in));
            br.readLine();
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] city = line.split(cvsSplitBy);
                String countryCode=city[0];
                String countryName=city[1];
                String cityCode=city[2];
                String cityName=city[3];
                cityDBService.save(new City(cityCode,cityName,countryName,countryCode));
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        System.out.println("Done");
    }

}
