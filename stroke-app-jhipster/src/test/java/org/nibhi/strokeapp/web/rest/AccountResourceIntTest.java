package org.nibhi.strokeapp.web.rest;

import org.nibhi.strokeapp.StrokeApp;
import org.nibhi.strokeapp.config.JHipsterProperties;
import org.nibhi.strokeapp.domain.Authority;
import org.nibhi.strokeapp.domain.User;
import org.nibhi.strokeapp.repository.AuthorityRepository;
import org.nibhi.strokeapp.repository.UserRepository;
import org.nibhi.strokeapp.security.AuthoritiesConstants;
import org.nibhi.strokeapp.service.MailService;
import org.nibhi.strokeapp.service.UserService;
import org.nibhi.strokeapp.service.dto.UserDTO;
import org.nibhi.strokeapp.web.rest.vm.ManagedUserVM;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.anyObject;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccountResource REST controller.
 *
 * @see UserService
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StrokeApp.class)
public class AccountResourceIntTest {

    @Inject
    private JHipsterProperties jHipsterProperties;

    @Inject
    private UserRepository userRepository;

    @Inject
    private AuthorityRepository authorityRepository;

    @Inject
    private UserService userService;

    @Mock
    private UserService mockUserService;

    @Mock
    private MailService mockMailService;

    private MockMvc restUserMockMvc;

    private MockMvc restMvc;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        doNothing().when(mockMailService).sendActivationEmail((User) anyObject(), anyString());

        AccountResource accountResource = new AccountResource();
        ReflectionTestUtils.setField(accountResource, "jHipsterProperties", jHipsterProperties);
        ReflectionTestUtils.setField(accountResource, "userRepository", userRepository);
        ReflectionTestUtils.setField(accountResource, "userService", userService);
        ReflectionTestUtils.setField(accountResource, "mailService", mockMailService);

        AccountResource accountUserMockResource = new AccountResource();
        ReflectionTestUtils.setField(accountUserMockResource, "userRepository", userRepository);
        ReflectionTestUtils.setField(accountUserMockResource, "userService", mockUserService);
        ReflectionTestUtils.setField(accountUserMockResource, "mailService", mockMailService);

        this.restMvc = MockMvcBuilders.standaloneSetup(accountResource).build();
        this.restUserMockMvc = MockMvcBuilders.standaloneSetup(accountUserMockResource).build();
    }

    @Test
    public void testNonAuthenticatedUser() throws Exception {
        restUserMockMvc.perform(get("/api/authenticate")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    public void testAuthenticatedUser() throws Exception {
        restUserMockMvc.perform(get("/api/authenticate")
                .with(request -> {
                    request.setRemoteUser("test");
                    return request;
                })
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("test"));
    }

    @Test
    public void testGetExistingAccount() throws Exception {
        Set<Authority> authorities = new HashSet<>();
        Authority authority = new Authority();
        authority.setName(AuthoritiesConstants.ADMIN);
        authorities.add(authority);

        User user = new User();
        user.setLogin("test");
        user.setFirstName("john");
        user.setLastName("doe");
        user.setEmail("john.doe@jhipter.com");
        user.setAuthorities(authorities);
        when(mockUserService.getUserWithAuthorities()).thenReturn(user);

        restUserMockMvc.perform(get("/api/account")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.login").value("test"))
                .andExpect(jsonPath("$.firstName").value("john"))
                .andExpect(jsonPath("$.lastName").value("doe"))
                .andExpect(jsonPath("$.email").value("john.doe@jhipter.com"))
                .andExpect(jsonPath("$.authorities").value(AuthoritiesConstants.ADMIN));
    }

    @Test
    public void testGetUnknownAccount() throws Exception {
        when(mockUserService.getUserWithAuthorities()).thenReturn(null);

        restUserMockMvc.perform(get("/api/account")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError());
    }

    @Test
    @Transactional
    public void testRegisterValid() throws Exception {
        ManagedUserVM validUser = new ManagedUserVM(
            null,                   // id
            "joe",                  // login
            "password",             // password
            "Joe",                  // firstName
            "Shmoe",                // lastName
            "joe@example.com",      // e-mail
            true,                   // activated
            "en",                   // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.USER)),
            null,                   // createdBy
            null,                   // createdDate
            null,                   // lastModifiedBy
            null,                   // lastModifiedDate
            null                    // hospitalId
        );

        restMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(validUser)))
            .andExpect(status().isCreated());

        Optional<User> user = userRepository.findOneByLogin("joe");
        assertThat(user.isPresent()).isTrue();
    }

    @Test
    @Transactional
    public void testRegisterInvalidLogin() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM(
            null,                   // id
            "funky-log!n",          // login <-- invalid
            "password",             // password
            "Funky",                // firstName
            "One",                  // lastName
            "funky@example.com",    // e-mail
            true,                   // activated
            "en",                   // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.USER)),
            null,                   // createdBy
            null,                   // createdDate
            null,                   // lastModifiedBy
            null,                   // lastModifiedDate
            null                    // hospitalId
        );

        restUserMockMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(invalidUser)))
            .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByEmail("funky@example.com");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterInvalidEmail() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM(
            null,               // id
            "bob",              // login
            "password",         // password
            "Bob",              // firstName
            "Green",            // lastName
            "invalid",          // e-mail <-- invalid
            true,               // activated
            "en",               // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.USER)),
            null,               // createdBy
            null,               // createdDate
            null,               // lastModifiedBy
            null,               // lastModifiedDate
            null                // hospitalId
        );

        restUserMockMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(invalidUser)))
            .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByLogin("bob");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterInvalidPassword() throws Exception {
        ManagedUserVM invalidUser = new ManagedUserVM(
            null,               // id
            "bob",              // login
            "123",              // password with only 3 digits
            "Bob",              // firstName
            "Green",            // lastName
            "bob@example.com",  // e-mail
            true,               // activated
            "en",               // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.USER)),
            null,               // createdBy
            null,               // createdDate
            null,               // lastModifiedBy
            null,               // lastModifiedDate
            null                // hospitalId
        );

        restUserMockMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(invalidUser)))
            .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByLogin("bob");
        assertThat(user.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterDuplicateLogin() throws Exception {
        // Good
        ManagedUserVM validUser = new ManagedUserVM(
            null,                   // id
            "alice",                // login
            "password",             // password
            "Alice",                // firstName
            "Something",            // lastName
            "alice@example.com",    // e-mail
            true,                   // activated
            "en",                   // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.USER)),
            null,                   // createdBy
            null,                   // createdDate
            null,                   // lastModifiedBy
            null,                   // lastModifiedDate
            null                    // hospitalId
        );

        // Duplicate login, different e-mail
        ManagedUserVM duplicatedUser = new ManagedUserVM(validUser.getId(), validUser.getLogin(), validUser.getPassword(), validUser.getLogin(), validUser.getLastName(),
            "alicejr@example.com", true, validUser.getLangKey(), validUser.getAuthorities(), validUser.getCreatedBy(), validUser.getCreatedDate(), validUser.getLastModifiedBy(), validUser.getLastModifiedDate(), validUser.getHospitalId());

        // Good user
        restMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(validUser)))
            .andExpect(status().isCreated());

        // Duplicate login
        restMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(duplicatedUser)))
            .andExpect(status().is4xxClientError());

        Optional<User> userDup = userRepository.findOneByEmail("alicejr@example.com");
        assertThat(userDup.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterDuplicateEmail() throws Exception {
        // Good
        ManagedUserVM validUser = new ManagedUserVM(
            null,                   // id
            "john",                 // login
            "password",             // password
            "John",                 // firstName
            "Doe",                  // lastName
            "john@example.com",     // e-mail
            true,                   // activated
            "en",                   // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.USER)),
            null,                   // createdBy
            null,                   // createdDate
            null,                   // lastModifiedBy
            null,                   // lastModifiedDate
            null                    // hospitalId
        );

        // Duplicate e-mail, different login
        ManagedUserVM duplicatedUser = new ManagedUserVM(validUser.getId(), "johnjr", validUser.getPassword(), validUser.getLogin(), validUser.getLastName(),
            validUser.getEmail(), true, validUser.getLangKey(), validUser.getAuthorities(), validUser.getCreatedBy(), validUser.getCreatedDate(), validUser.getLastModifiedBy(), validUser.getLastModifiedDate(), validUser.getHospitalId());

        // Good user
        restMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(validUser)))
            .andExpect(status().isCreated());

        // Duplicate e-mail
        restMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(duplicatedUser)))
            .andExpect(status().is4xxClientError());

        Optional<User> userDup = userRepository.findOneByLogin("johnjr");
        assertThat(userDup.isPresent()).isFalse();
    }

    @Test
    @Transactional
    public void testRegisterAdminIsIgnored() throws Exception {
        ManagedUserVM validUser = new ManagedUserVM(
            null,                   // id
            "badguy",               // login
            "password",             // password
            "Bad",                  // firstName
            "Guy",                  // lastName
            "badguy@example.com",   // e-mail
            true,                   // activated
            "en",                   // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.ADMIN)),
            null,                   // createdBy
            null,                   // createdDate
            null,                   // lastModifiedBy
            null,                   // lastModifiedDate
            null                    // hospitalId
        );

        restMvc.perform(
            post("/api/register")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(validUser)))
            .andExpect(status().isCreated());

        Optional<User> userDup = userRepository.findOneByLogin("badguy");
        assertThat(userDup.isPresent()).isTrue();
        assertThat(userDup.get().getAuthorities()).hasSize(1)
            .containsExactly(authorityRepository.findOne(AuthoritiesConstants.USER));
    }

    @Test
    @Transactional
    public void testSaveInvalidLogin() throws Exception {
        UserDTO invalidUser = new UserDTO(
            "funky-log!n",          // login <-- invalid
            "Funky",                // firstName
            "One",                  // lastName
            "funky@example.com",    // e-mail
            true,                   // activated
            "en",                   // langKey
            new HashSet<>(Arrays.asList(AuthoritiesConstants.USER)),
            null //
        );

        restUserMockMvc.perform(
            post("/api/account")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(invalidUser)))
            .andExpect(status().isBadRequest());

        Optional<User> user = userRepository.findOneByEmail("funky@example.com");
        assertThat(user.isPresent()).isFalse();
    }
}
