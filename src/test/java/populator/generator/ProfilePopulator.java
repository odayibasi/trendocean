package populator.generator;

import com.trendocean.BaseLocalIntegrationTestCase;
import com.trendocean.domain.AccountStateEnum;
import com.trendocean.domain.EducationEnum;
import com.trendocean.domain.GenderEnum;
import com.trendocean.domain.Profile;
import com.trendocean.service.db.IUserDBService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class ProfilePopulator extends BaseLocalIntegrationTestCase {

    @Autowired
    IUserDBService userDBService;

    @Test
    @Transactional
    @Rollback(true)
    public void populateUser(){
        List<Profile> users=userDBService.getAll();
        userDBService.removeAll(users);
        Profile profile=new Profile();
        profile.setUsername("odayibasi");
        profile.setPassword("12asdsdasdasd");
        profile.setEmail("odayibai@gmail.com");
        profile.setFullName("onur dayibasi");
        profile.setAbout("onur dayibasi trendocean profile");
        profile.setAccountState(AccountStateEnum.ACTIVATED);
        profile.setEducation(EducationEnum.BACHELOR);
        profile.setGender(GenderEnum.MALE);
        userDBService.save(profile);
    }

}
