package org.nibhi.strokeapp.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String RESEARCHER = "ROLE_RESEARCHER";
    
    public static final String MOBILE = "ROLE_MOBILE";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";


    private AuthoritiesConstants() {
    }
}
