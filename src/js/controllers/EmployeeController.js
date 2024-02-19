import Handlebars from 'handlebars'
import { Dialog } from '@capacitor/dialog';
import router from '../router.js'

// Handlebars template text in files. Remember we are not in a server so can not use filesystem!
// We select what properties we like to have from the object.
import { employeeHbs } from '../templates/employee.js'
import { employeeFormHbs } from '../templates/employeeForm.js'
import { employeeDeleteFormHbs } from '../templates/employeeDeleteForm.js'
import { employeeCreateFormHbs } from '../templates/employeeCreateForm.js'

export default class EmployeeController {
    constructor(employeeService) {
        this.employeeService = employeeService;
        this.selectedEmployee = null;
        this.mode = "Update"; // default is to update form, we also can use the same form for create then the value shall/could be Create. ALso need to add eventhandler for this also
        // To show the details about the employee
        this.employeeCompiled = Handlebars.compile(employeeHbs);

        // To modify the employee
        this.employeeFormCompiled = Handlebars.compile(employeeFormHbs);

        this.employeeDeleteFormCompiled = Handlebars.compile(employeeDeleteFormHbs)

        this.employeeCreateFormCompiled = Handlebars.compile(employeeCreateFormHbs)

    }

    initialize = () => {
        // if needed
    }

    setupEventHandlers = () => {
        let element = null;

        const deleteElement = document.getElementById('onDelete')
        if (deleteElement)
            deleteElement.addEventListener('click', this.onDeleteEmployee)

        // Only available if we have rendered the employeeForm
        element = document.getElementById('submitEmployee');
        // Are we doing a update or create
        if (element)
            element.addEventListener('submit', this.onSubmitEmployee);

        const createButton = document.getElementById('createEmployeeButton');
        if (createButton) {
            createButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopImmediatePropagation();
                console.log('Create button clicked');
                this.onCreateEmployee();
            });
        }

    }

    onSubmitEmployee = async (event) => {

        event.preventDefault();
        event.stopImmediatePropagation();

        // The form sending the data
        const form = event.target;
        //FormData is a helper to get key:value pairs 
        // ALL ARE STRINGS SO WE NEED TO CONVERT NUMBER STRINGS to numbers
        const formData = new FormData(form);

        // Convert from DTO to object.
        const formPersonObj = Object.fromEntries(formData.entries());
        formPersonObj.id = parseInt(formPersonObj.id);

        const result = await this.employeeService.persist(formPersonObj);
        if (result == true) {
            const employee = this.employeeService.findById(parseInt(formPersonObj.id));
            this.selectedEmployee = employee;

            if (this.selectedEmployee != null) {

                // If we are here, we are on the 'bright' side!
                await Dialog.alert({
                    title: 'Save',
                    message: 'employee saved',
                });

                const url = "#employees/" + this.selectedEmployee.id + "/read";
                // Page based switching on url
                router.load(url);

            } else {
                await Dialog.alert({
                    title: 'Save',
                    message: 'employee NOT saved',
                });
            }

            // We return false so the form do not try to send to noexisting server, even if we have the preventors!
            return false;

        }
    }
    onDeleteEmployee = async (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();

        // The form sending the data
        const form = document.getElementById('submitEmployee');
        // FormData is a helper to get key:value pairs 
        // ALL ARE STRINGS SO WE NEED TO CONVERT NUMBER STRINGS to numbers
        const formData = new FormData(form);

        // Convert from DTO to object.
        const formPersonObj = Object.fromEntries(formData.entries());
        const employeeId = parseInt(formPersonObj.id);

        // Display a confirmation dialog
        const confirmResult = await Dialog.confirm({
            title: 'Delete',
            message: 'Are you sure you want to delete this employee?',
        });

        if (confirmResult.value) {
            // Proceed with the deletion
            const result = this.employeeService.delete(employeeId);

            if (result) {
                // Employee deleted successfully
                await Dialog.alert({
                    title: 'Delete',
                    message: 'Employee deleted successfully',
                });


                // Page based switching on url
                router.load('');

                // Redirect to some page or update UI as needed
            } else {
                // Employee not found or deletion failed
                await Dialog.alert({
                    title: 'Delete',
                    message: 'Employee not found or deletion failed',
                });
            }
        } else {
            // The user canceled the deletion
            await Dialog.alert({
                title: 'Delete',
                message: 'Employee deletion canceled',
            });
        }

        // Handle other actions as needed
        return false;
    }
    onCreateEmployee = async () => {
        try {

            const form = document.getElementById('createEmployeeForm');

            if (!form) {
                console.error('Form element not found.');
                return;
            }

            // Create a new employee using the form data
            const formData = new FormData(form);

            const newEmployee = {};

            formData.forEach((value, key) => {
                newEmployee[key] = value;
            });

            // Set the mode to "Create"
            this.mode = "Create";

            // Persist the new employee
            const result = await this.employeeService.persist(newEmployee);

            if (result) {
                // Employee created successfully
                await Dialog.alert({
                    title: 'Create',
                    message: 'Employee created successfully',
                });

                // Redirect or update UI as needed
                router.load(''); // Redirect to the desired page
            } else {
                // Employee creation failed
                await Dialog.alert({
                    title: 'Create',
                    message: 'Employee creation failed',
                });
            }
        } catch (error) {
            console.error('Error in onCreateEmployee:', error);
            // Handle the error, log it, or display an alert as needed
        }
        return false;
    }

    render = () => {
        // We should check if there is a selectedEmployee and return an error if not!
        return this.employeeCompiled(this.selectedEmployee) // Here we give the context to use to the handlebars compiled function
    }

    renderForm = () => {
        return this.employeeFormCompiled({
            employee: this.selectedEmployee,
            mode: this.mode,
            isCreateMode: this.mode === "Create", // Add this line
            isNotCreateMode: this.mode !== "Create",
        });
    };
    renderDeleteForm = () => {
        return this.employeeDeleteFormCompiled({ employee: this.selectedEmployee, mode: this.mode })
    }
    renderCreateForm = () => {
        const emptyEmployee = {
            id: 0,
            title: '',
            firstName: '',
            lastName: '',
            managerId: 0,
            managerName: '',
            department: '',
            cellPhone: '',
            officePhone: '',
            email: '',
            city: '',
            twitterId: '',
            blog: '',
            // Add other properties and set default values as needed
        };

        return this.employeeCreateFormCompiled({ employee: emptyEmployee });
    };

    renderReadById = (employeeId) => {
        const employee = this.employeeService.findById(parseInt(employeeId));
        this.selectedEmployee = employee;

        return this.render();
    }

    renderUpdateById = (employeeId) => {
        const employee = this.employeeService.findById(parseInt(employeeId));
        this.selectedEmployee = employee;
        this.mode = "Update";

        return this.renderForm(); // Handlebars will create the callback name submitEmployeeEdit
    }

    renderCreateById = () => {
        this.mode = "Create";
        return this.renderCreateForm();
    };

    renderDeleteById = (employeeId) => {
        const employee = this.employeeService.findById(parseInt(employeeId))
        this.selectedEmployee = employee;
        this.mode = "Delete"

        return this.renderDeleteForm()
    }

}