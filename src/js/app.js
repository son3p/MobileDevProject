// Import the class from the service implementation
import EmployeeService from './services/memory/EmployeeService.js';
import HomeController from './controllers/HomeController.js';
import EmployeeController from './controllers/EmployeeController.js';
import router from './router.js'
 
/* ---------------------------------- File local Functions ---------------------------------- */

const setupApplication = () => {
    console.log('windows loaded - setting up application');

    /* ---------------------------------- Local Variables ---------------------------------- */
    let service = new EmployeeService()
    console.log("Employee service initialized");

    /* ----- Setup routes, ie frontend page switching ----- */
    router.addRoute('', () => {
        console.log('empty fragment route');

        // Set the body, the controller takes care of it's own list
        const homeController = new HomeController(service);
        document.body.innerHTML = homeController.render();
        console.log("body html assigned");

        //Setup the start list
        homeController.findByName();
        
        /* --------------------------------- Event Registration -------------------------------- */
        // The search string in inside the home page so we can register only after the body content is injected
        window.searchString.oninput = homeController.findByName;
    });

    router.addRoute('employees/:id/read', (employeeId) => {
        console.log('employee details route ');
        const employeeController = new EmployeeController(service);
        window.content.innerHTML = employeeController.renderReadById(employeeId);
        console.log("content html assigned for read");
    });

    router.addRoute('employees/:id/edit', (employeeId) => {
        console.log('employee update route ');
        const employeeController = new EmployeeController(service);
        window.content.innerHTML = employeeController.renderUpdateById(employeeId);
        // We need to setup eventhandlers AFTER the elements exist in the DOM tree
        employeeController.setupEventHandlers();
        console.log("content html assigned for update");
    });

    router.addRoute('employees/:id/delete', (employeeId) => {
        console.log('employee delete route ');
        const employeeController = new EmployeeController(service);
        window.content.innerHTML = employeeController.renderDeleteById(employeeId);
        // We need to setup eventhandlers AFTER the elements exist in the DOM tree
        employeeController.setupEventHandlers();
        console.log("content html assigned for delete");
    });

    router.addRoute('employees/create', () => {
        console.log('employee create route ');
        const employeeController = new EmployeeController(service);
        window.content.innerHTML = employeeController.renderCreateById();
        // We need to setup eventhandlers AFTER the elements exist in the DOM tree
        employeeController.setupEventHandlers();
        console.log("content html assigned for create");
    });

    // Start the router
    router.parseRoute();

}

// Add our EventListener for when the window is loaded
window.onload = setupApplication;