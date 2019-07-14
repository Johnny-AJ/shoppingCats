// 入口函数
$(function () {
    // 把购物车的的数据从本地存储读取出来
    let jsonStr = localStorage.getItem('wbData');
    // 创建一个数组
    let arr;
    // 判断jsonstr是否null，如果是null就是没有数据，没有null就是有数据，生成  商品列表
    if (jsonStr !== null) {
        arr = JSON.parse(jsonStr);
        // 遍历数组
        let html = '';
        arr.forEach(e => {
            html += `<div class="item" data-id="${e.pID}">
            <div class="row">
              <div class="cell col-1 row">
                <div class="cell col-1">
                  <input type="checkbox" class="item-ck" checked="">
                </div>
                <div class="cell col-4">
                  <img src="${e.imgSrc}" alt="">
                </div>
              </div>
              <div class="cell col-4 row">
                <div class="item-name">${e.name}</div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="price">${e.price}</em>
              </div>
              <div class="cell col-1 tc lh70">
                <div class="item-count">
                  <a href="javascript:void(0);" class="reduce fl">-</a>
                  <input autocomplete="off" type="text" class="number fl" value="1">
                  <a href="javascript:void(0);" class="add fl">+</a>
                </div>
              </div>
              <div class="cell col-1 tc lh70">
                <span>￥</span>
                <em class="computed">${e.price * e.number}</em>
              </div>
              <div class="cell col-1">
                <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
              </div>
            </div>
          </div>`;
        });

        // 修改html格式
        $('.item-list').html(html);
        // 空空如也隐藏
        $('.empty-tip').hide();
        // 表头+总计显示出来
        $('.cart-header').show();
        $('.total-of').show();
    };


    function countAndMoney() {
        // 总价
        let totalCount = 0;
        // 总金额
        let totalMoney = 0;
        // 选取小盒子里面的input，有多个相同属性，选取type里面的checbox
        $('.item-list inpur[type=checkbox]:checked').each((i, e) => {
            // 根据id获取到item-list里面的子元素item，并且attr选取里面的ID
            let id = parseFloat($(e).parent('.item').attr('data-id'));
            arr.forEach(e => {
                if (id === e.pID) {
                    // 总价
                    totalCount += e.number;
                    // 总金额
                    totalMoney += e.number * e.price;
                }
            })
        });
        // 修改数量和总价
        $('.selected').text(totalCount);
        $('.total-money').text(totalMoney);
    };
    countAndMoney();


    // 全选和不全选
    $('.pick-all').on('click', function () {
        // 当前的状态
        let status = $(this).prop('checked');
        // 设置每个商品样式和自己一样
        $('.item-ck').prop('checked', status);
        // 上下两个全选同步
        $('.pick-all').prop('checked', status);
        countAndMoney();
    })


    // 委托事件，都是动态生成的元素，拜托事件委托
    
});