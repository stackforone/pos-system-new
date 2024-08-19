document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', () => {
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    window.toggleForm = (id) => {
        const formContainer = document.getElementById(id);
        formContainer.style.display = formContainer.style.display === 'flex' ? 'none' : 'flex';
    }

    window.showPage = (pageId) => {
        const pages = document.querySelectorAll('.page');
        
        // ซ่อนเฉพาะเนื้อหาหน้าทั้งหมด แต่ไม่ซ่อนเมนูด้านบน
        pages.forEach(page => {
            page.style.display = 'none';
        });
        
        // แสดงหน้าเนื้อหาที่เลือก
        document.getElementById(pageId).style.display = 'block';
        
        // ไม่ซ่อนเมนูหลังจากคลิก
        // ลบหรือแสดงความคิดเห็นส่วนนี้ถ้าเมนูหายไปหลังคลิก
        // if (menu.style.display === 'block') {
        //     menu.style.display = 'none';
        // }
    }
    
    // ฟังก์ชันเพิ่มหรือแก้ไขสินค้า
    window.addOrUpdateProduct = () => {
        const productName = document.getElementById('productName').value || 'ไม่ระบุ';
        const quantity = document.getElementById('quantity').value || 0;
        const price = document.getElementById('price').value || 0;
        const barcode = document.getElementById('barcode').value || 'ไม่ระบุ';

        // เก็บข้อมูลสินค้าใน localStorage
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ productName, quantity, price, barcode });
        localStorage.setItem('products', JSON.stringify(products));

        displayProducts();
        toggleForm('stockFormContainer');
        document.getElementById('stockForm').reset(); // รีเซ็ตฟอร์มหลังจากการบันทึก
    }

    // ฟังก์ชันแสดงรายการสินค้าในตาราง
    function displayProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const table = document.getElementById('stockTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // ล้างข้อมูลเก่า

        products.forEach((product, index) => {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerHTML = product.productName;
            newRow.insertCell(1).innerHTML = product.quantity;
            newRow.insertCell(2).innerHTML = product.price;
            newRow.insertCell(3).innerHTML = product.barcode;
            newRow.insertCell(4).innerHTML = `<div id="qrCode${index}"></div>`;
            newRow.insertCell(5).innerHTML = `<button onclick="deleteProduct(${index})">ลบ</button>`;

            generateQRCode(product.barcode, `qrCode${index}`);
        });
    }

    // ฟังก์ชันสร้าง QR Code
    function generateQRCode(data, elementId) {
        const qrCodeElement = document.getElementById(elementId);
        qrCodeElement.innerHTML = ''; // ล้างข้อมูลเก่า
        new QRCode(qrCodeElement, {
            text: data,
            width: 80,
            height: 80
        });
    }

    // ฟังก์ชันลบสินค้า
    window.deleteProduct = (index) => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }

    // เรียกใช้ฟังก์ชันเพื่อแสดงรายการสินค้า
    displayProducts();

    // ฟังก์ชันเพิ่มหรือแก้ไขการขาย
    window.addSale = () => {
        const productName = document.getElementById('productName').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const price = document.getElementById('price').value.trim();
        const salesType = document.getElementById('salesType').value;
        const salesperson = document.getElementById('salesperson').value.trim();
    
        // บันทึกข้อมูลการขายลงใน localStorage โดยไม่ตรวจสอบการกรอกข้อมูล
        const sales = JSON.parse(localStorage.getItem('sales')) || [];
        sales.push({ productName, quantity, price, salesType, salesperson });
        localStorage.setItem('sales', JSON.stringify(sales));
    
        displaySales();
        toggleForm('salesFormContainer');
        document.getElementById('salesForm').reset(); // รีเซ็ตฟอร์มหลังจากการบันทึก
    }
    
    
    // ฟังก์ชันแสดงรายการการขายในตาราง
    function displaySales() {
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    const table = document.getElementById('salesTable').getElementsByTagName('tbody')[0];
    table.innerHTML = ''; // ล้างข้อมูลเก่า

    sales.forEach((sale, index) => {
        const newRow = table.insertRow();
        newRow.insertCell(0).innerHTML = sale.productName;
        newRow.insertCell(1).innerHTML = sale.quantity;
        newRow.insertCell(2).innerHTML = sale.price;
        newRow.insertCell(3).innerHTML = sale.quantity * sale.price;
        newRow.insertCell(4).innerHTML = sale.salesType;
        newRow.insertCell(5).innerHTML = sale.salesperson;
        newRow.insertCell(6).innerHTML = `<button onclick="deleteSale(${index})">ลบ</button>`;
    });
}

    // ฟังก์ชันลบรายการการขาย
    window.deleteSale = (index) => {
    const sales = JSON.parse(localStorage.getItem('sales')) || [];
    sales.splice(index, 1);
    localStorage.setItem('sales', JSON.stringify(sales));
    displaySales();
}

    // เรียกใช้ฟังก์ชันเพื่อแสดงรายการการขายตอนโหลดหน้าเว็บ
    displaySales();


    // ฟังก์ชันเพิ่มหรือแก้ไขการซ่อม
    window.addRepair = () => {
        const deviceName = document.getElementById('deviceName').value || 'ไม่ระบุ';
        const repairDate = document.getElementById('repairDate').value || 'ไม่ระบุ';
        const repairDetails = document.getElementById('repairDetails').value || 'ไม่ระบุ';
        const repairStatus = document.getElementById('repairStatus').value || 'inProgress';

        // เก็บข้อมูลการซ่อมใน localStorage
        const repairs = JSON.parse(localStorage.getItem('repairs')) || [];
        repairs.push({ deviceName, repairDate, repairDetails, repairStatus });
        localStorage.setItem('repairs', JSON.stringify(repairs));

        displayRepairs();
        toggleForm('repairsFormContainer');
        document.getElementById('repairsForm').reset(); // รีเซ็ตฟอร์มหลังจากการบันทึก
    }

    // ฟังก์ชันแสดงรายการการซ่อมในตาราง
    function displayRepairs() {
        const repairs = JSON.parse(localStorage.getItem('repairs')) || [];
        const repairsTable = document.getElementById('repairsTable').getElementsByTagName('tbody')[0];
        repairsTable.innerHTML = ''; // ล้างข้อมูลเก่า

        repairs.forEach((repair, index) => {
            const newRow = repairsTable.insertRow();
            newRow.insertCell(0).innerHTML = repair.deviceName;
            newRow.insertCell(1).innerHTML = repair.repairDate;
            newRow.insertCell(2).innerHTML = repair.repairDetails;
            newRow.insertCell(3).innerHTML = repair.repairStatus === 'inProgress' ? 'กำลังซ่อม' : 'เสร็จสิ้น';
            newRow.insertCell(4).innerHTML = `<button onclick="deleteRepair(${index})">ลบ</button>`;
        });
    }

    // ฟังก์ชันลบรายการการซ่อม
    window.deleteRepair = (index) => {
        const repairs = JSON.parse(localStorage.getItem('repairs')) || [];
        repairs.splice(index, 1);
        localStorage.setItem('repairs', JSON.stringify(repairs));
        displayRepairs();
    }

    // โหลดข้อมูลการซ่อมตอนหน้าเว็บเริ่มทำงาน
    displayRepairs();

     // ฟังก์ชันเพิ่มหรือแก้ไขค่าใช้จ่าย
     window.addExpense = () => {
        const expenseName = document.getElementById('expenseName').value || 'ไม่ระบุ';
        const expenseAmount = document.getElementById('expenseAmount').value || 0;
        const expenseDate = document.getElementById('expenseDate').value || 'ไม่ระบุ';

        // เก็บข้อมูลค่าใช้จ่ายใน localStorage
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.push({ expenseName, expenseAmount, expenseDate });
        localStorage.setItem('expenses', JSON.stringify(expenses));

        displayExpenses();
        toggleForm('expensesFormContainer');
        document.getElementById('expensesForm').reset(); // รีเซ็ตฟอร์มหลังจากการบันทึก
    }

    // ฟังก์ชันแสดงรายการค่าใช้จ่ายในตาราง
    function displayExpenses() {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        const table = document.getElementById('expensesTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // ล้างข้อมูลเก่า

        expenses.forEach((expense, index) => {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerHTML = expense.expenseName;
            newRow.insertCell(1).innerHTML = expense.expenseAmount;
            newRow.insertCell(2).innerHTML = expense.expenseDate;
            newRow.insertCell(3).innerHTML = `<button onclick="deleteExpense(${index})">ลบ</button>`;
        });
    }

    // ฟังก์ชันลบรายการค่าใช้จ่าย
    window.deleteExpense = (index) => {
        const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        displayExpenses();
    }

    // โหลดข้อมูลค่าใช้จ่ายตอนหน้าเว็บเริ่มทำงาน
    displayExpenses();

    // ฟังก์ชันเพิ่มหรือแก้ไขการเข้าทำงาน
    window.addAttendance = () => {
        const employeeName = document.getElementById('employeeName').value || 'ไม่ระบุ';
        const attendanceDate = document.getElementById('attendanceDate').value || 'ไม่ระบุ';
        const checkInTime = document.getElementById('checkInTime').value || 'ไม่ระบุ';
        const checkOutTime = document.getElementById('checkOutTime').value || 'ไม่ระบุ';

        // เก็บข้อมูลการเข้าทำงานใน localStorage
        const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
        attendance.push({ employeeName, attendanceDate, checkInTime, checkOutTime });
        localStorage.setItem('attendance', JSON.stringify(attendance));

        displayAttendance();
        toggleForm('attendanceFormContainer');
        document.getElementById('attendanceForm').reset(); // รีเซ็ตฟอร์มหลังจากการบันทึก
    }

    // ฟังก์ชันแสดงรายการการเข้าทำงานในตาราง
    function displayAttendance() {
        const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
        const table = document.getElementById('attendanceTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // ล้างข้อมูลเก่า

        attendance.forEach((record, index) => {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerHTML = record.employeeName;
            newRow.insertCell(1).innerHTML = record.attendanceDate;
            newRow.insertCell(2).innerHTML = record.checkInTime;
            newRow.insertCell(3).innerHTML = record.checkOutTime;
            newRow.insertCell(4).innerHTML = `<button onclick="deleteAttendance(${index})">ลบ</button>`;
        });
    }

    // ฟังก์ชันลบรายการการเข้าทำงาน
    window.deleteAttendance = (index) => {
        const attendance = JSON.parse(localStorage.getItem('attendance')) || [];
        attendance.splice(index, 1);
        localStorage.setItem('attendance', JSON.stringify(attendance));
        displayAttendance();
    }

    // โหลดข้อมูลการเข้าทำงานตอนหน้าเว็บเริ่มทำงาน
    displayAttendance();
     
    // ฟังก์ชันเพิ่มหรือแก้ไขการขายฝาก
    window.addConsignment = () => {
        const itemName = document.getElementById('itemName').value || 'ไม่ระบุ';
        const consignmentAmount = document.getElementById('consignmentAmount').value || 0;
        const consignmentDate = document.getElementById('consignmentDate').value || 'ไม่ระบุ';

        // เก็บข้อมูลการขายฝากใน localStorage
        const consignments = JSON.parse(localStorage.getItem('consignments')) || [];
        consignments.push({ itemName, consignmentAmount, consignmentDate });
        localStorage.setItem('consignments', JSON.stringify(consignments));

        displayConsignments();
        toggleForm('consignmentFormContainer');
        document.getElementById('consignmentForm').reset(); // รีเซ็ตฟอร์มหลังจากการบันทึก
    }

    // ฟังก์ชันแสดงรายการการขายฝากในตาราง
    function displayConsignments() {
        const consignments = JSON.parse(localStorage.getItem('consignments')) || [];
        const table = document.getElementById('consignmentTable').getElementsByTagName('tbody')[0];
        table.innerHTML = ''; // ล้างข้อมูลเก่า

        consignments.forEach((consignment, index) => {
            const newRow = table.insertRow();
            newRow.insertCell(0).innerHTML = consignment.itemName;
            newRow.insertCell(1).innerHTML = consignment.consignmentAmount;
            newRow.insertCell(2).innerHTML = consignment.consignmentDate;
            newRow.insertCell(3).innerHTML = `<button onclick="deleteConsignment(${index})">ลบ</button>`;
        });
    }

    // ฟังก์ชันลบรายการการขายฝาก
    window.deleteConsignment = (index) => {
        const consignments = JSON.parse(localStorage.getItem('consignments')) || [];
        consignments.splice(index, 1);
        localStorage.setItem('consignments', JSON.stringify(consignments));
        displayConsignments();
    }

    // โหลดข้อมูลการขายฝากตอนหน้าเว็บเริ่มทำงาน
    displayConsignments();

        // ฟังก์ชันเพิ่มหรือแก้ไขผู้ดูแลระบบ
        window.addOrUpdateAdmin = () => {
            const adminName = document.getElementById('adminName').value || 'ไม่ระบุ';
            const adminRole = document.getElementById('adminRole').value || 'staff';
    
            // เก็บข้อมูลผู้ดูแลระบบใน localStorage
            const admins = JSON.parse(localStorage.getItem('admins')) || [];
            admins.push({ adminName, adminRole });
            localStorage.setItem('admins', JSON.stringify(admins));
    
            displayAdmins();
            toggleForm('adminFormContainer');
            document.getElementById('adminForm').reset(); // รีเซ็ตฟอร์มหลังจากการบันทึก
        }
    
        // ฟังก์ชันแสดงรายการผู้ดูแลระบบในตาราง
        function displayAdmins() {
            const admins = JSON.parse(localStorage.getItem('admins')) || [];
            const table = document.getElementById('adminTable').getElementsByTagName('tbody')[0];
            table.innerHTML = ''; // ล้างข้อมูลเก่า
    
            admins.forEach((admin, index) => {
                const newRow = table.insertRow();
                newRow.insertCell(0).innerHTML = admin.adminName;
                newRow.insertCell(1).innerHTML = admin.adminRole;
                newRow.insertCell(2).innerHTML = `<button onclick="deleteAdmin(${index})">ลบ</button>`;
            });
        }
    
        // ฟังก์ชันลบผู้ดูแลระบบ
        window.deleteAdmin = (index) => {
            const admins = JSON.parse(localStorage.getItem('admins')) || [];
            admins.splice(index, 1);
            localStorage.setItem('admins', JSON.stringify(admins));
            displayAdmins();
        }
    
        // โหลดข้อมูลผู้ดูแลระบบตอนหน้าเว็บเริ่มทำงาน
        displayAdmins();
    

    // โหลดข้อมูลตอนหน้าเว็บเริ่มทำงาน
    displayProducts();
    displayRepairs();
    displayExpenses();
});
