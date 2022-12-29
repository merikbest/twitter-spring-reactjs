package com.gmail.merikbest2015.configuration;//package com.gmail.merikbest2015.configuration;
//
//import org.springframework.cache.CacheManager;
//import org.springframework.cache.annotation.CachingConfigurerSupport;
//import org.springframework.cache.annotation.EnableCaching;
//import org.springframework.cache.ehcache.EhCacheCacheManager;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import net.sf.ehcache.config.CacheConfiguration;
//
//@Configuration
//@EnableCaching
//public class CachingConfiguration extends CachingConfigurerSupport {
//
//    @Bean
//    public net.sf.ehcache.CacheManager ehCacheManager() {
//        CacheConfiguration tweetsCache = new CacheConfiguration();
//        tweetsCache.setName("tweets-cache");
//        tweetsCache.setMemoryStoreEvictionPolicy("LRU");
//        tweetsCache.setMaxEntriesLocalHeap(1000);
//        tweetsCache.setTimeToLiveSeconds(3600);
//        net.sf.ehcache.config.Configuration configuration = new net.sf.ehcache.config.Configuration();
//        configuration.addCache(tweetsCache);
//        return net.sf.ehcache.CacheManager.newInstance(configuration);
//    }
//
//    @Bean
//    @Override
//    public CacheManager cacheManager() {
//        return new EhCacheCacheManager(ehCacheManager());
//    }
//}
