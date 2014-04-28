package populator.generator;

import com.trendocean.BaseLocalIntegrationTestCase;
import com.trendocean.domain.Country;
import com.trendocean.service.db.ICountryDBService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.util.List;

public class CountryPopulator extends BaseLocalIntegrationTestCase {

    @Autowired
    ICountryDBService countryDBService;

    @Test
    @Transactional
    public void populateCountries(){
        List<Country> countries=countryDBService.getAll();
        countryDBService.removeAll(countries);
        readCountriesAndPersistDB();
    }

    public void readCountriesAndPersistDB() {

        BufferedReader br = null;
        String line = "";
        String cvsSplitBy = ",";

        try {

            InputStream in = getClass().getResourceAsStream("/countries.csv");
            br = new BufferedReader(new InputStreamReader(in));
            br.readLine();
            while ((line = br.readLine()) != null) {

                // use comma as separator
                String[] city = line.split(cvsSplitBy);
                String code=city[0];
                String name=city[1];
                countryDBService.save(new Country(code,name));
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
