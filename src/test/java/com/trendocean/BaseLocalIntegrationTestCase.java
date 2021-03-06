package com.trendocean;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContext-test.xml"})
@TransactionConfiguration(defaultRollback = false, transactionManager = "transactionManager")
public abstract class BaseLocalIntegrationTestCase extends BaseIntegrationTestCase implements TestConstants {

}
