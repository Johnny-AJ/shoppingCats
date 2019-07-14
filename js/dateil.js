// 入口函数
$(function () {

    // 获取ID元素
    let id = parseInt(location.search.substring(4));
    // 在遍历数组里面寻找相对应的ID数据
    let obj = phoneData.find((e) => {
        return e.pID === id;
    });


    // 修改页面对应信息，图片，名称，价格
    // 修改名字
    $('.sku-name').text(obj.name);
    // 修改价格
    $('.summary-price em').text('￥' + obj.price);
    // 修改图片
    $('.preview-img>img').attr('src', obj.imgSrc);


    // 获取元素
    let addBtn = $('.add');
    let reduceBtn = $('.reduce');
    let chooseNumber = $('.choose-number');
    // 加
    // 点击事件
    addBtn.on('click', function () {
        // 当前框框的的数字,显示数字不是字符串
        let old = parseInt(chooseNumber.val());
        // 当前显示为1，  可以点击增加，也可以点击减
        old++;
        if (old > 1) {
            reduceBtn.removeClass('disabled');
        }
        // 重新设置
        chooseNumber.val(old);
    });
    // 减
    // 点击事件
    reduceBtn.on('click', function () {
        // 当前显示的数字，显示数字，不是字符串
        let old = parseInt(chooseNumber.val());
        // 如果当前时1，不能继续点击减
        if (old === 1) {
            return;
        }
        old--;
        // 不能小于1，无法继续点击
        if (old === 1) {
            reduceBtn.addClass('disabled');
        }
        // 重新设置
        chooseNumber.val(old);
    });

    // 取出本地内存数据
    // 点击购物车
    // 获取元素,注册点击事件
    $('.addshopcar').on('click', function () {
        // 获取点击数量,是一个数字，不是字符串
        let number = parseInt($('.choose-number').val());
        // 先获取本地内存，取出本地数据，在增加新增数据
        let jsonStr = localStorage.getItem('wbData');
        // 创建数组，判断是否有内容数据，没有就新建，有就null
        let arr;
        // 判断是否有数据
        if (jsonStr === null) {
            // 有数据就null
            arr = [];
        } else {
            // 没有就新建一个数组字符串
            arr = JSON.parse(jsonStr);
        }


        // 在数组里面寻找相对应的ID
        let isExit = arr.find(e => {
            return e.pID === id;
        });
        // 判断，如果数组有相同的ID就加加，如果是undefined，就是没有
        if (isExit !== undefined) {
            // 数量叠加
            isExit.number += number;
        } else {
            // 如果没有相同就新建一个
            let good = {
                // 键：值
                pID: obj.pID,
                imgSrc: obj.imgSrc,
                name: obj.name,
                price: obj.price,
                number: number
            };
            arr.push(good);
        };
        // 存储本地数据
        // 把所有的数据都转换成JSON字符串， 可以把任何数据都转换成字符串
        jsonStr = JSON.stringify(arr);
        // 存储到本地内存
        localStorage.setItem('wbData', jsonStr);
        // 直接跳转到购物车页面
        location.href = 'cart.html';
    });
});