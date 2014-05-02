package com.trendocean.dao.hibernate;


import com.trendocean.dao.IQuestionDAO;
import com.trendocean.dao.hibernate.base.BaseDAOImpl;
import com.trendocean.domain.Question;
import org.springframework.stereotype.Repository;

@Repository
public class QuestionHibernateDAO extends BaseDAOImpl<Question> implements IQuestionDAO {
}
