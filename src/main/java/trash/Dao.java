package trash;

import javax.persistence.EntityManager;

abstract class Dao {
	protected Object sessionFactory;
	protected EntityManager entityManager;

//	Dao() throws Exception {
//		// A SessionFactory is set up once for an application!
//		// configures settings from hibernate.cfg.xml
//		final StandardServiceRegistry registry = new StandardServiceRegistryBuilder().configure().build();
//		try {
//			sessionFactory = new MetadataSources( registry ).buildMetadata().buildSessionFactory();
//			entityManager = sessionFactory.createEntityManager();
//		}
//		catch (Exception e) {
//			StandardServiceRegistryBuilder.destroy( registry );
//			throw e;
//		}
//	}
}
