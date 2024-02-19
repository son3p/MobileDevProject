const employeeDeleteFormHbs = `
<header class="navbar navbar-light bg-light navbar-expand">
    <a class="nav-link" href="#employees/{{ employee.id }}/read">
        <h1 class="btn btn-primary bi-chevron-left">Back&nbsp;&nbsp;</h1>
    </a>
    <h2 class="navbar-text"> &nbsp; &nbsp;{{mode}} Employee</h2>
</header>

<form id="submitEmployee" >
    <input type="hidden" class="form-control" id="id" name="id" value={{ employee.id }}>
    <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName" name="firstName" value = "{{employee.firstName}}" placeholder="Enter first name" readonly>
    </div>
    <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName" name="lastName" value = "{{employee.lastName}}" placeholder="Enter last name" readonly/>
    </div>
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" name="title" value = "{{employee.title}}" placeholder="Enter title" readonly/>
    </div>
    <br>
    <div class="form-group">
        <button type="Delete" class="btn btn-primary" value="Delete" id="onDelete">Delete</button>
    </div>
</form>
`
export {employeeDeleteFormHbs};