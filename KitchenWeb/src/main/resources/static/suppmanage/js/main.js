/**
 * 明厨亮灶系统 - 供应商管理模块
 * 实现功能：增删改查、导出、筛选
 */

// 供应商数据（示例数据，实际项目中应从服务器获取）
let suppliersData = [
    {
        id: 1,
        name: "鲜生蔬菜有限公司",
        category: "蔬菜",
        contactPerson: "张明",
        contactPhone: "13812345678",
        status: "合作中",
        lastDeliveryDate: "2023-05-15",
        address: "北京市朝阳区农业示范园区12号",
        remarks: "主要供应绿叶蔬菜，质量稳定"
    },
    {
        id: 2,
        name: "海鲜水产批发中心",
        category: "水产",
        contactPerson: "李强",
        contactPhone: "13987654321",
        status: "合作中",
        lastDeliveryDate: "2023-05-18",
        address: "广州市黄埔区水产市场B12区",
        remarks: "供应各类海鲜，价格合理"
    },
    {
        id: 3,
        name: "绿源有机蔬菜基地",
        category: "蔬菜",
        contactPerson: "王芳",
        contactPhone: "13567891234",
        status: "合作中",
        lastDeliveryDate: "2023-05-16",
        address: "成都市郊区有机农业示范基地",
        remarks: "有机蔬菜，无农药"
    },
    {
        id: 4,
        name: "优质肉类供应商",
        category: "肉类",
        contactPerson: "赵伟",
        contactPhone: "13612345678",
        status: "已暂停",
        lastDeliveryDate: "2023-04-25",
        address: "重庆市渝北区食品城A15",
        remarks: "暂停合作原因：价格调整中"
    },
    {
        id: 5,
        name: "东方调味品厂",
        category: "调料",
        contactPerson: "刘洋",
        contactPhone: "13312345678",
        status: "合作中",
        lastDeliveryDate: "2023-05-12",
        address: "四川省成都市温江区食品工业园",
        remarks: "各类调味品供应商"
    },
    {
        id: 6,
        name: "丰收粮油有限公司",
        category: "干货",
        contactPerson: "陈晓",
        contactPhone: "15912345678",
        status: "已终止",
        lastDeliveryDate: "2023-03-10",
        address: "湖南省长沙市星沙产业基地",
        remarks: "合作终止原因：供应质量不稳定"
    },
    {
        id: 7,
        name: "绿鲜农产品有限公司",
        category: "蔬菜",
        contactPerson: "周丽",
        contactPhone: "13712345678",
        status: "合作中",
        lastDeliveryDate: "2023-05-19",
        address: "江苏省苏州市相城区现代农业园区",
        remarks: ""
    },
    {
        id: 8,
        name: "鑫源肉类批发",
        category: "肉类",
        contactPerson: "孙明",
        contactPhone: "13812345679",
        status: "合作中",
        lastDeliveryDate: "2023-05-17",
        address: "上海市嘉定区食品加工区",
        remarks: "主要供应猪肉、牛肉"
    }
];

// 全局变量
let currentPage = 1;
const pageSize = 5;
let filteredData = [];
let editingId = null;
let toDeleteId = null;

// DOM 元素
const supplierTable = document.getElementById("supplierTable");
const tbody = supplierTable.querySelector("tbody");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const addSupplierBtn = document.getElementById("addSupplierBtn");
const exportBtn = document.getElementById("exportBtn");
const supplierModal = document.getElementById("supplierModal");
const confirmModal = document.getElementById("confirmModal");
const detailModal = document.getElementById("detailModal");
const supplierForm = document.getElementById("supplierForm");
const modalTitle = document.getElementById("modalTitle");
const closeButtons = document.querySelectorAll(".close");
const cancelButtons = document.querySelectorAll(".cancel-btn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

// 页面加载时初始化
document.addEventListener("DOMContentLoaded", () => {
    // 初始数据加载
    filterAndDisplayData();
    
    // 事件监听器设置
    setupEventListeners();
});

// 设置所有事件监听
function setupEventListeners() {
    // 搜索按钮点击事件
    searchBtn.addEventListener("click", () => {
        currentPage = 1;
        filterAndDisplayData();
    });
    
    // 搜索输入框回车事件
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            currentPage = 1;
            filterAndDisplayData();
        }
    });
    
    // 类别筛选变化事件
    categoryFilter.addEventListener("change", () => {
        currentPage = 1;
        filterAndDisplayData();
    });
    
    // 状态筛选变化事件
    statusFilter.addEventListener("change", () => {
        currentPage = 1;
        filterAndDisplayData();
    });
    
    // 新增供应商按钮点击事件
    addSupplierBtn.addEventListener("click", () => {
        openAddModal();
    });
    
    // 导出按钮点击事件
    exportBtn.addEventListener("click", exportToExcel);
    
    // 供应商表单提交事件
    supplierForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveSupplier();
    });
    
    // 关闭按钮点击事件
    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            closeAllModals();
        });
    });
    
    // 取消按钮点击事件
    cancelButtons.forEach(button => {
        button.addEventListener("click", () => {
            closeAllModals();
        });
    });
    
    // 确认删除按钮点击事件
    confirmDeleteBtn.addEventListener("click", () => {
        deleteSupplier();
        closeAllModals();
    });
}

// 筛选并显示数据
function filterAndDisplayData() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const statusValue = statusFilter.value;
    
    // 根据筛选条件过滤数据
    filteredData = suppliersData.filter(supplier => {
        const matchesSearch = 
            supplier.name.toLowerCase().includes(searchTerm) ||
            supplier.contactPerson.toLowerCase().includes(searchTerm) ||
            supplier.contactPhone.includes(searchTerm);
        
        const matchesCategory = categoryValue === "" || supplier.category === categoryValue;
        const matchesStatus = statusValue === "" || supplier.status === statusValue;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    // 更新数据显示和分页
    renderTable();
    renderPagination();
}

// 渲染表格数据
function renderTable() {
    // 清空表格内容
    tbody.innerHTML = "";
    
    // 计算当前页的数据范围
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    
    // 如果没有数据，显示提示信息
    if (currentPageData.length === 0) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `<td colspan="8" style="text-align: center;">暂无符合条件的供应商数据</td>`;
        tbody.appendChild(emptyRow);
        return;
    }
    
    // 遍历数据并生成表格行
    currentPageData.forEach((supplier, index) => {
        const row = document.createElement("tr");
        
        // 设置状态样式类名
        let statusClass = "";
        switch(supplier.status) {
            case "合作中":
                statusClass = "status-active";
                break;
            case "已暂停":
                statusClass = "status-paused";
                break;
            case "已终止":
                statusClass = "status-ended";
                break;
        }
        
        // 序号从1开始，考虑分页
        const displayIndex = startIndex + index + 1;
        
        // 构建表格行HTML
        row.innerHTML = `
            <td>${displayIndex}</td>
            <td>${supplier.name}</td>
            <td>${supplier.category}</td>
            <td>${supplier.contactPerson}</td>
            <td>${supplier.contactPhone}</td>
            <td class="${statusClass}">${supplier.status}</td>
            <td>${supplier.lastDeliveryDate}</td>
            <td>
                <button class="action-btn detail-btn" data-id="${supplier.id}"><i class="bi bi-eye"></i></button>
                <button class="action-btn edit-btn" data-id="${supplier.id}"><i class="bi bi-pencil"></i></button>
                <button class="action-btn delete-btn" data-id="${supplier.id}"><i class="bi bi-trash"></i></button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // 为操作按钮添加事件监听
    setupTableActionButtons();
}

// 设置表格操作按钮的事件
function setupTableActionButtons() {
    // 查看详情按钮点击事件
    const detailButtons = document.querySelectorAll(".detail-btn");
    detailButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openDetailModal(id);
        });
    });

    // 编辑按钮点击事件
    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openEditModal(id);
        });
    });
    
    // 删除按钮点击事件
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openDeleteConfirmModal(id);
        });
    });
}

// 渲染分页控件
function renderPagination() {
    pagination.innerHTML = "";
    
    const totalPages = Math.ceil(filteredData.length / pageSize);
    
    // 如果只有一页或没有数据，不显示分页
    if (totalPages <= 1) {
        return;
    }
    
    // 创建"上一页"按钮
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = "上一页";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            renderPagination();
        }
    });
    pagination.appendChild(prevBtn);
    
    // 创建页码按钮
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;
        
        if (i === currentPage) {
            pageBtn.classList.add("active");
        }
        
        pageBtn.addEventListener("click", () => {
            currentPage = i;
            renderTable();
            renderPagination();
        });
        
        pagination.appendChild(pageBtn);
    }
    
    // 创建"下一页"按钮
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = "下一页";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            renderPagination();
        }
    });
    pagination.appendChild(nextBtn);
}

// 打开新增供应商模态框
function openAddModal() {
    modalTitle.textContent = "新增供应商";
    editingId = null;
    supplierForm.reset();
    document.getElementById("supplierStatus").value = "合作中"; // 默认状态
    supplierModal.style.display = "block";
}

// 打开编辑供应商模态框
function openEditModal(id) {
    const supplier = suppliersData.find(s => s.id === id);
    if (!supplier) return;
    
    modalTitle.textContent = "编辑供应商";
    editingId = id;
    
    // 填充表单数据
    document.getElementById("supplierId").value = supplier.id;
    document.getElementById("supplierName").value = supplier.name;
    document.getElementById("supplierCategory").value = supplier.category;
    document.getElementById("contactPerson").value = supplier.contactPerson;
    document.getElementById("contactPhone").value = supplier.contactPhone;
    document.getElementById("supplierStatus").value = supplier.status;
    document.getElementById("address").value = supplier.address || "";
    document.getElementById("remarks").value = supplier.remarks || "";
    
    supplierModal.style.display = "block";
}

// 打开删除确认模态框
function openDeleteConfirmModal(id) {
    toDeleteId = id;
    confirmModal.style.display = "block";
}

// 关闭所有模态框
function closeAllModals() {
    supplierModal.style.display = "none";
    confirmModal.style.display = "none";
    detailModal.style.display = "none";
}

// 打开详情模态框
function openDetailModal(id) {
    const supplier = suppliersData.find(s => s.id === id);
    if (!supplier) return;
    
    // 填充详情内容
    document.getElementById("detailName").textContent = supplier.name;
    document.getElementById("detailCategory").textContent = supplier.category;
    document.getElementById("detailContactPerson").textContent = supplier.contactPerson;
    document.getElementById("detailContactPhone").textContent = supplier.contactPhone;
    document.getElementById("detailStatus").textContent = supplier.status;
    document.getElementById("detailAddress").textContent = supplier.address || "无";
    document.getElementById("detailLastDeliveryDate").textContent = supplier.lastDeliveryDate || "无";
    document.getElementById("detailRemarks").textContent = supplier.remarks || "无";
    
    // 显示详情模态框
    detailModal.style.display = "block";
}

// 保存供应商信息
function saveSupplier() {
    // 获取表单数据
    const name = document.getElementById("supplierName").value;
    const category = document.getElementById("supplierCategory").value;
    const contactPerson = document.getElementById("contactPerson").value;
    const contactPhone = document.getElementById("contactPhone").value;
    const status = document.getElementById("supplierStatus").value;
    const address = document.getElementById("address").value;
    const remarks = document.getElementById("remarks").value;
    
    // 表单验证
    if (!name || !category || !contactPerson || !contactPhone || !status) {
        alert("请填写必填项！");
        return;
    }
    
    // 创建供应商对象
    const supplierData = {
        name,
        category,
        contactPerson,
        contactPhone,
        status,
        address,
        remarks,
        lastDeliveryDate: status === "合作中" ? getCurrentDate() : ""
    };
    
    if (editingId === null) {
        // 新增供应商
        const newId = suppliersData.length > 0 ? Math.max(...suppliersData.map(s => s.id)) + 1 : 1;
        supplierData.id = newId;
        suppliersData.push(supplierData);
    } else {
        // 更新供应商
        const index = suppliersData.findIndex(s => s.id === editingId);
        if (index !== -1) {
            // 保留原始的最近入货日期
            const originalDate = suppliersData[index].lastDeliveryDate;
            supplierData.lastDeliveryDate = originalDate;
            supplierData.id = editingId;
            suppliersData[index] = supplierData;
        }
    }
    
    // 关闭模态框并刷新数据
    closeAllModals();
    filterAndDisplayData();
    
    // 显示操作成功提示
    showToast(editingId === null ? "供应商添加成功！" : "供应商信息已更新！");
}

// 删除供应商
function deleteSupplier() {
    if (toDeleteId === null) return;
    
    // 查找并删除供应商
    const index = suppliersData.findIndex(s => s.id === toDeleteId);
    if (index !== -1) {
        suppliersData.splice(index, 1);
        
        // 刷新数据显示
        filterAndDisplayData();
        
        // 显示删除成功提示
        showToast("供应商已删除！");
    }
    
    toDeleteId = null;
}

// 导出数据到Excel
function exportToExcel() {
    // 实际项目中可以使用第三方库如SheetJS/xlsx实现导出
    // 这里使用简易方式，通过创建CSV并触发下载
    
    // 添加表头
    let csvContent = "序号,供应商名称,类别,联系人,联系电话,合作状态,最近入货日期,地址,备注\n";
    
    // 添加数据行
    filteredData.forEach((supplier, index) => {
        const row = [
            index + 1,
            supplier.name,
            supplier.category,
            supplier.contactPerson,
            supplier.contactPhone,
            supplier.status,
            supplier.lastDeliveryDate,
            supplier.address || "",
            supplier.remarks || ""
        ];
        
        // 处理CSV中的引号和逗号
        const formattedRow = row.map(cell => {
            const cellStr = String(cell);
            return cellStr.includes(",") ? `"${cellStr}"` : cellStr;
        });
        
        csvContent += formattedRow.join(",") + "\n";
    });
    
    // 创建Blob对象并触发下载
    const blob = new Blob(["\ufeff" + csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // 设置文件名
    const date = new Date().toISOString().slice(0, 10);
    link.setAttribute("href", url);
    link.setAttribute("download", `供应商数据_${date}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("数据导出成功！");
}

// 获取当前日期
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// 显示提示消息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 添加样式
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    toast.style.color = "#fff";
    toast.style.padding = "12px 20px";
    toast.style.borderRadius = "4px";
    toast.style.zIndex = "2000";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";
    
    // 显示提示
    setTimeout(() => {
        toast.style.opacity = "1";
    }, 10);
    
    // 3秒后移除提示
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
} 