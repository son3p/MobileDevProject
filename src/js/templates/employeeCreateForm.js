const employeeCreateFormHbs = `
<header class="navbar navbar-light bg-light navbar-expand">
    <a class="nav-link" href="#employees/{{ employee.id }}/read">
        <h1 class="btn btn-primary bi-chevron-left">Back&nbsp;&nbsp;</h1>
    </a>
    <h2 class="navbar-text">{{mode}} Employee</h2>
</header>


    <form id="createEmployeeForm">
    <input type="hidden" class="form-control" id="id" name="id" value={{ employee.id }}>
    <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName" name="firstName" value = "{{employee.firstName}}" placeholder="Enter first name">
    </div>
    <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName" name="lastName" value = "{{employee.lastName}}" placeholder="Enter last name"/>
    </div>
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" name="title" value = "{{employee.title}}" placeholder="Enter title"/>
    </div>
    <div class="form-group">
        <label for="managerId">Manager ID</label>
        <input type="text" class="form-control" id="managerId" name="managerId" value="{{employee.managerId}}" placeholder="Enter manager ID">
    </div>

    <div class="form-group">
        <label for="department">Department</label>
        <input type="text" class="form-control" id="department" name="department" value="{{employee.department}}" placeholder="Enter department">
    </div>

    <div class="form-group">
        <label for="cellPhone">Cell Phone</label>
        <input type="text" class="form-control" id="cellPhone" name="cellPhone" value="{{employee.cellPhone}}" placeholder="Enter cell phone">
    </div>

    <div class="form-group">
        <label for="officePhone">Office Phone</label>
        <input type="text" class="form-control" id="officePhone" name="officePhone" value="{{employee.officePhone}}" placeholder="Enter office phone">
    </div>

    <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" name="email" value="{{employee.email}}" placeholder="Enter email">
    </div>

    <div class="form-group">
        <label for="city">City</label>
        <input type="text" class="form-control" id="city" name="city" value="{{employee.city}}" placeholder="Enter city">
    </div>

    <div class="form-group">
        <label for="twitterId">Twitter ID</label>
        <input type="text" class="form-control" id="twitterId" name="twitterId" value="{{employee.twitterId}}" placeholder="Enter Twitter ID">
    </div>

    <div class="form-group">
        <label for="blog">Blog</label>
        <input type="text" class="form-control" id="blog" name="blog" value="{{employee.blog}}" placeholder="Enter blog URL">
    </div>
    <div class="form-group">
        <button type="submit" class="btn btn-primary" id="createEmployeeButton" value="Create">Create</button>
    </div>
    </form>
`
export {employeeCreateFormHbs};