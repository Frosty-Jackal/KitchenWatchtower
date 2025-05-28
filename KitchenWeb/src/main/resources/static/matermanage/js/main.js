/**
 * 明厨亮灶系统 - 原材料管理模块
 * 实现功能：增删改查、导出、筛选
 */

// 原材料数据（示例数据，实际项目中应从服务器获取）
let materialsData = [
    {
        id: 1,
        name: "大白菜",
        category: "蔬菜",
        specification: "散装",
        quantity: 50,
        unit: "kg",
        status: "充足",
        lastEntryDate: "2023-05-15",
        source: "鲜生蔬菜有限公司",
        remarks: "保存在1号冷库"
    },
    {
        id: 2,
        name: "三文鱼",
        category: "水产",
        specification: "整条",
        quantity: 15,
        unit: "kg",
        status: "不足",
        lastEntryDate: "2023-05-18",
        source: "海鲜水产批发中心",
        remarks: "冷冻保存，近期需补货"
    },
    {
        id: 3,
        name: "有机菠菜",
        category: "蔬菜",
        specification: "散装",
        quantity: 10,
        unit: "kg",
        status: "不足",
        lastEntryDate: "2023-05-16",
        source: "绿源有机蔬菜基地",
        remarks: "无农药，清洗后使用"
    },
    {
        id: 4,
        name: "猪五花肉",
        category: "肉类",
        specification: "切片",
        quantity: 0,
        unit: "kg",
        status: "缺货",
        lastEntryDate: "2023-04-25",
        source: "优质肉类供应商",
        remarks: "需要紧急补货"
    },
    {
        id: 5,
        name: "川味豆瓣酱",
        category: "调料",
        specification: "2kg/桶",
        quantity: 8,
        unit: "桶",
        status: "充足",
        lastEntryDate: "2023-05-12",
        source: "东方调味品厂",
        remarks: "厨房常用，保持适量库存"
    },
    {
        id: 6,
        name: "大米",
        category: "干货",
        specification: "25kg/袋",
        quantity: 12,
        unit: "袋",
        status: "充足",
        lastEntryDate: "2023-05-10",
        source: "丰收粮油有限公司",
        remarks: "存放在干燥处"
    },
    {
        id: 7,
        name: "西红柿",
        category: "蔬菜",
        specification: "散装",
        quantity: 15,
        unit: "kg",
        status: "不足",
        lastEntryDate: "2023-05-19",
        source: "绿鲜农产品有限公司",
        remarks: ""
    },
    {
        id: 8,
        name: "牛腩肉",
        category: "肉类",
        specification: "块状",
        quantity: 20,
        unit: "kg",
        status: "充足",
        lastEntryDate: "2023-05-17",
        source: "鑫源肉类批发",
        remarks: "红烧牛腩主料"
    }
];

// 全局变量
let currentPage = 1;
const pageSize = 5;
let filteredData = [];
let editingId = null;
let toDeleteId = null;

// DOM 元素
const materialTable = document.getElementById("materialTable");
const tbody = materialTable.querySelector("tbody");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryFilter = document.getElementById("categoryFilter");
const statusFilter = document.getElementById("statusFilter");
const addMaterialBtn = document.getElementById("addMaterialBtn");
const exportBtn = document.getElementById("exportBtn");
const materialModal = document.getElementById("materialModal");
const confirmModal = document.getElementById("confirmModal");
const detailModal = document.getElementById("detailModal");
const materialForm = document.getElementById("materialForm");
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
    
    // 新增原材料按钮点击事件
    addMaterialBtn.addEventListener("click", () => {
        openAddModal();
    });
    
    // 导出按钮点击事件
    exportBtn.addEventListener("click", exportToExcel);
    
    // 原材料表单提交事件
    materialForm.addEventListener("submit", (e) => {
        e.preventDefault();
        saveMaterial();
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
        deleteMaterial();
        closeAllModals();
    });
}

// 筛选并显示数据
function filterAndDisplayData() {
    const searchTerm = searchInput.value.toLowerCase();
    const categoryValue = categoryFilter.value;
    const statusValue = statusFilter.value;
    
    // 根据筛选条件过滤数据
    filteredData = materialsData.filter(material => {
        const matchesSearch = 
            material.name.toLowerCase().includes(searchTerm) ||
            material.specification.toLowerCase().includes(searchTerm) ||
            material.source.toLowerCase().includes(searchTerm);
        
        const matchesCategory = categoryValue === "" || material.category === categoryValue;
        const matchesStatus = statusValue === "" || material.status === statusValue;
        
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
        emptyRow.innerHTML = `<td colspan="8" style="text-align: center;">暂无符合条件的原材料数据</td>`;
        tbody.appendChild(emptyRow);
        return;
    }
    
    // 遍历数据并生成表格行
    currentPageData.forEach((material, index) => {
        const row = document.createElement("tr");
        
        // 设置状态样式类名
        let statusClass = "";
        switch(material.status) {
            case "充足":
                statusClass = "status-active";
                break;
            case "不足":
                statusClass = "status-paused";
                break;
            case "缺货":
                statusClass = "status-ended";
                break;
        }
        
        // 设置行内容
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${material.name}</td>
            <td>${material.category}</td>
            <td>${material.specification}</td>
            <td>${material.quantity} ${material.unit}</td>
            <td class="${statusClass}">${material.status}</td>
            <td>${material.lastEntryDate}</td>
            <td>
                <button class="action-btn view-btn" data-id="${material.id}" title="查看详情">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="action-btn edit-btn" data-id="${material.id}" title="编辑">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${material.id}" title="删除">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // 设置表格操作按钮的事件监听
    setupTableActionButtons();
}

// 设置表格操作按钮的事件监听
function setupTableActionButtons() {
    // 查看按钮点击事件
    document.querySelectorAll(".view-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openDetailModal(id);
        });
    });
    
    // 编辑按钮点击事件
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openEditModal(id);
        });
    });
    
    // 删除按钮点击事件
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.getAttribute("data-id"));
            openDeleteConfirmModal(id);
        });
    });
}

// 渲染分页控件
function renderPagination() {
    // 清空分页控件
    pagination.innerHTML = "";
    
    // 计算总页数
    const totalPages = Math.ceil(filteredData.length / pageSize);
    
    // 如果只有一页，则不显示分页控件
    if (totalPages <= 1) {
        return;
    }
    
    // 创建"上一页"按钮
    const prevButton = document.createElement("button");
    prevButton.innerHTML = "&laquo;";
    prevButton.title = "上一页";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            renderPagination();
        }
    });
    pagination.appendChild(prevButton);
    
    // 创建页码按钮
    // 最多显示5个页码按钮
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // 如果页数不足5页，则调整起始页
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.title = `第${i}页`;
        pageButton.classList.toggle("active", i === currentPage);
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderTable();
            renderPagination();
        });
        pagination.appendChild(pageButton);
    }
    
    // 创建"下一页"按钮
    const nextButton = document.createElement("button");
    nextButton.innerHTML = "&raquo;";
    nextButton.title = "下一页";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            renderPagination();
        }
    });
    pagination.appendChild(nextButton);
}

// 打开新增模态框
function openAddModal() {
    modalTitle.textContent = "新增原材料";
    materialForm.reset();
    document.getElementById("materialId").value = "";
    editingId = null;
    materialModal.style.display = "block";
}

// 打开编辑模态框
function openEditModal(id) {
    modalTitle.textContent = "编辑原材料";
    editingId = id;
    
    // 查找要编辑的原材料数据
    const material = materialsData.find(item => item.id === id);
    if (material) {
        document.getElementById("materialId").value = material.id;
        document.getElementById("materialName").value = material.name;
        document.getElementById("materialCategory").value = material.category;
        document.getElementById("specification").value = material.specification;
        document.getElementById("quantity").value = material.quantity;
        document.getElementById("unit").value = material.unit;
        document.getElementById("materialStatus").value = material.status;
        document.getElementById("source").value = material.source;
        document.getElementById("remarks").value = material.remarks;
        
        materialModal.style.display = "block";
    }
}

// 打开删除确认模态框
function openDeleteConfirmModal(id) {
    toDeleteId = id;
    confirmModal.style.display = "block";
}

// 关闭所有模态框
function closeAllModals() {
    materialModal.style.display = "none";
    confirmModal.style.display = "none";
    detailModal.style.display = "none";
}

// 打开详情模态框
function openDetailModal(id) {
    // 查找要查看的原材料数据
    const material = materialsData.find(item => item.id === id);
    if (material) {
        document.getElementById("detailName").textContent = material.name;
        document.getElementById("detailCategory").textContent = material.category;
        document.getElementById("detailSpecification").textContent = material.specification;
        document.getElementById("detailQuantity").textContent = `${material.quantity} ${material.unit}`;
        document.getElementById("detailUnit").textContent = material.unit;
        document.getElementById("detailStatus").textContent = material.status;
        document.getElementById("detailSource").textContent = material.source;
        document.getElementById("detailLastEntryDate").textContent = material.lastEntryDate;
        document.getElementById("detailRemarks").textContent = material.remarks;
        
        detailModal.style.display = "block";
    }
}

// 保存原材料数据
function saveMaterial() {
    // 获取表单数据
    const id = document.getElementById("materialId").value;
    const name = document.getElementById("materialName").value;
    const category = document.getElementById("materialCategory").value;
    const specification = document.getElementById("specification").value;
    const quantity = parseFloat(document.getElementById("quantity").value);
    const unit = document.getElementById("unit").value;
    const status = document.getElementById("materialStatus").value;
    const source = document.getElementById("source").value;
    const remarks = document.getElementById("remarks").value;
    
    // 表单验证
    if (!name || !category || !specification || isNaN(quantity) || !unit || !status) {
        alert("请填写必填字段！");
        return;
    }
    
    if (editingId) {
        // 编辑现有原材料
        const index = materialsData.findIndex(item => item.id === editingId);
        if (index !== -1) {
            materialsData[index] = {
                id: editingId,
                name,
                category,
                specification,
                quantity,
                unit,
                status,
                source,
                lastEntryDate: materialsData[index].lastEntryDate,
                remarks
            };
            showToast("原材料信息已更新");
        }
    } else {
        // 新增原材料
        const newId = Math.max(...materialsData.map(item => item.id), 0) + 1;
        const newMaterial = {
            id: newId,
            name,
            category,
            specification,
            quantity,
            unit,
            status,
            source,
            lastEntryDate: getCurrentDate(),
            remarks
        };
        materialsData.push(newMaterial);
        showToast("原材料已添加");
    }
    
    // 关闭模态框，刷新表格
    closeAllModals();
    filterAndDisplayData();
}

// 删除原材料
function deleteMaterial() {
    if (toDeleteId) {
        const index = materialsData.findIndex(item => item.id === toDeleteId);
        if (index !== -1) {
            materialsData.splice(index, 1);
            showToast("原材料已删除");
            
            // 刷新表格
            filterAndDisplayData();
        }
        toDeleteId = null;
    }
}

// 导出Excel
function exportToExcel() {
    // 确定要导出的数据
    const dataToExport = filteredData.length > 0 ? filteredData : materialsData;
    
    // 创建CSV内容
    let csvContent = "序号,原材料名称,类别,规格,库存数量,单位,库存状态,来源,最近入库日期,备注\n";
    
    // 添加数据行
    dataToExport.forEach((material, index) => {
        const row = [
            index + 1,
            material.name,
            material.category,
            material.specification,
            material.quantity,
            material.unit,
            material.status,
            material.source,
            material.lastEntryDate,
            material.remarks
        ];
        
        // 处理文本中的逗号，用引号包裹
        const formattedRow = row.map(cell => {
            // 如果内容包含逗号、双引号或换行符，则用双引号包裹
            if (cell && typeof cell === "string" && (cell.includes(",") || cell.includes("\"") || cell.includes("\n"))) {
                // 将双引号替换为两个双引号
                return `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
        });
        
        csvContent += formattedRow.join(",") + "\n";
    });
    
    // 创建Blob对象
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // 创建下载链接
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    // 设置下载属性
    link.setAttribute("href", url);
    link.setAttribute("download", `原材料数据_${getCurrentDate()}.csv`);
    link.style.visibility = "hidden";
    
    // 添加到文档并触发点击
    document.body.appendChild(link);
    link.click();
    
    // 清理
    document.body.removeChild(link);
    showToast("数据导出成功");
}

// 获取当前日期（格式：YYYY-MM-DD）
function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// 显示提示消息
function showToast(message) {
    // 创建一个提示消息元素
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    
    // 添加到文档
    document.body.appendChild(toast);
    
    // 淡入
    setTimeout(() => {
        toast.classList.add("show");
    }, 10);
    
    // 2秒后淡出
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
} 