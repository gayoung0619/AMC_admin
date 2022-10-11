$(document).ready(function() {

    // 로그인페이지
    $('.field').on('input', function () {
        if(! $(this).val() == ''){
            $(this).parent().addClass('on');
        }else{
            $(this).parent().removeClass('on');
        }

    });

    // 네비게이션
    const $gnb = $('.depth1');
    $gnb.find('> li').on('mouseenter focus', function () {
        $(this).addClass('on').children().addClass('on');
    });
    $gnb.find('> li').on('mouseleave', function () {
        $(this).removeClass('on').children().removeClass('on');
    });

    $('.depth2 > li').on('mouseenter focus', function () {
        if($(this).hasClass('on')){
            $(this).removeClass('on');
        }else{
            $(this).addClass('on').siblings().removeClass('on');
        }
    });
    $('.depth2 > li').on('mouseleave', function () {
        $(this).removeClass('on');
    });


    // 클릭시 클론
    $(".right_move").click(function(){
        var vSelect=$("#leftSelect option:selected");
        vSelect.clone().appendTo("#rightSelect");
        vSelect.remove();
    });
    $("#leftSelect").dblclick(function () {
        var vSelect=$("#leftSelect option:selected");
        vSelect.clone().appendTo("#rightSelect");
        vSelect.remove();
    });

    $(".left_move").click(function(){
        var vSelect=$("#rightSelect option:selected");
        //
        vSelect.clone().appendTo("#leftSelect");
        vSelect.remove();
    });
    $("#rightSelect").dblclick(function () {
        var vSelect=$("#rightSelect option:selected");
        vSelect.clone().appendTo("#leftSelect");
        vSelect.remove();
    });



    // 파일이름
    $('#dashboard .send').click(function () {
        const filename = $('.file_name input[type="text"]');
        var fieldNames = [];
        const field = $('.checkboxes .fieldName').is(':checked');

        let isNullField = false;
        if(filename.val().trim() === ""){
            alert('이름을 입력해주세요');
            return false;
        } else if (!field) {
            alert('내보낼 필드를 선택해주세요.');
            return false;
        } else {
            /*$(field).each(function (index, item) {
                fieldNames.push(item.id);
            })
            let postObject = new Object();
            postObject.fileName = filename.val();
            postObject.fieldNames = fieldNames;
            postObject.searchType = '30';

            console.log(postObject)

            $.ajax({
                type: "POST",
                async: false,
                url: "/api/admin/dashboard/download",
                data: JSON.stringify(postObject),
                /!*xhrFields: {
                    responseType: "blob",
                },*!/
                contentType: "application/json",
                beforeSend: function () {
                    $('.wrap-loading').removeClass('display-none');
                }, complete: function () {
                    $('.wrap-loading').addClass('display-none');
                }, success: function (data) {
                    if (data.resultCode === "500") {
                        alert("오류가 발생했습니다. 개발자에게 문의해주세요.")
                    } else if (data.resultCode === "402") {
                        alert("데이터가 존재하지 않습니다.")
                    } else {
                        alert('성공!');
                    }
                }, error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("통신 실패.")
                }
            });*/
        }
    });

    // 체크박스
    $( '#all' ).click( function() {
        var checked = $(this).is(':checked');

        if(checked){
            $(this).parent().siblings().children('input[type="checkbox"]').prop('checked', true);
        } else {
            $(this).parent().siblings().children('input[type="checkbox"]').prop('checked', false);
        }
    } );

    $('.checkbox_wrap input[type="checkbox"]').not('#all').click( function() {
        var checked = $(this).is(':checked');
        if (!checked) {
            $('#all').prop('checked', false);
        } else {
            var is_checked = true;
            $('.checkbox_wrap input[type="checkbox"]').not('#all').each(function(){
                is_checked = is_checked && $(this).is(':checked');
            });
            $('#all').prop('checked', is_checked);
        }
    });

    // 파일 업로드
    function customUploadButton() {
        $('.js-button-file-upload-input').on('change', function () {
            var val = $(this).val().split(/(\\|\/)/g).pop();
            if (val !== "") {
                $(".js-button-file-upload-text")
                    .text(val)
                    .parent()
                    .removeClass("not-selected");
            } else {
                $(".js-button-file-upload-text")
                    .text('')
                    .parent()
                    .addClass("not-selected");
            }
        });
    }

    customUploadButton();



    // 바그래프 height값
    $('.bar').each(function(index, element) {
        const bar = $('.bar')
        const xbartxt = $(this).children().text();
        const xbarNum = parseInt(xbartxt);
        const ybartxt = $('.ybar').text();
        const ybarNum = parseInt(ybartxt);
        let barNumPer = xbarNum / ybarNum *100

        // 100%를 넘길 경우
        if (xbarNum >= ybarNum) {
            barNumPer = 100;
        }

        $(this).css('height', barNumPer + '%');
    });

    // 바 그래프 천단위 콤마 찍기(x축)
    $('.x-re').each(function(index, element) {
        const bartxt = $(this).children().text();
        $(this).children().text(bartxt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    });
    // 바 그래프 천단위 콤마 찍기(y축)
    $('.y-re').each(function(index, element) {
        const bartxt = $(this).text();
        $(this).text(bartxt.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
    });

    // 캘린더
    var today = new Date();
    var date = new Date();

    $(".preMon").click(function() { // 이전달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date ( today.getFullYear(), today.getMonth()-1, today.getDate());
        buildCalendar();
    })

    $(".nextMon").click(function(){ //다음달
        $("#calendar > tbody > td").remove();
        $("#calendar > tbody > tr").remove();
        today = new Date ( today.getFullYear(), today.getMonth()+1, today.getDate());
        buildCalendar();
    })

    function buildCalendar() {

        nowYear = today.getFullYear();
        nowMonth = today.getMonth();
        firstDate = new Date(nowYear,nowMonth,1).getDate();
        firstDay = new Date(nowYear,nowMonth,1).getDay(); //1st의 요일
        lastDate = new Date(nowYear,nowMonth+1,0).getDate();

        if((nowYear%4===0 && nowYear % 100 !==0) || nowYear%400===0) { //윤년 적용
            lastDate[1]=29;
        }

        $(".year_mon").text(nowYear+"년 "+ (nowMonth+1)+"월");

        for (i=0; i<firstDay; i++) { //첫번째 줄 빈칸
            $("#calendar tbody:last").append("<td></td>");
        }
        for (i=1; i <=lastDate; i++){ // 날짜 채우기
            plusDate = new Date(nowYear,nowMonth,i).getDay();
            if (plusDate==0) {
                $("#calendar tbody:last").append("<tr></tr>");
            }
            $("#calendar tbody:last").append("<td class='date'><span>"+ i +"</span></td>");
        }

        if($("#calendar > tbody > td").length%7!=0) { //마지막 줄 빈칸
            for(i=1; i<= $("#calendar > tbody > td").length%7; i++) {
                $("#calendar tbody:last").append("<td></td>");
            }
        }
        $(".date").each(function(index){ // 오늘 날짜 표시
            if(nowYear==date.getFullYear() && nowMonth==date.getMonth() && $(".date").eq(index).text()==date.getDate()) {
                $(".date").eq(index).addClass('colToday');
            }
        })

    }
    buildCalendar();
    //$("#calendar tbody td").append("<div class=tooltips><h4>" + i++ +"일" + "</h4><p><span>신규 가입유저</span><span>80명</span></p><p><span>업로드 파일수</span><span>15개</span></p><div class=length><p>신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저신규가입유저</p></div></div>");

    // 툴팁
    $(document).on('mouseenter', '.date', function () {
        $(this).children('.tooltips').addClass('on');
        $(this).on('mouseleave', function () {
            $(this).children('.tooltips').removeClass('on');
        });
    });

    // notice 취소버튼
    $('.notice .reset').click(function () {
        $(this).parent().prev().children('textarea').val('');
    });
    $('.notice .save').click(function () {
        const dd =$(this).parent().prev().children('textarea').val();
        $(this).parent().prev().children('textarea').html(dd);

    });

    // 연도월 select
    setDateBox();
    // 연도월 select
    function setDateBox(){
        const dt = new Date();
        let year = "";
        const com_year = dt.getFullYear();
        // 발행 뿌려주기
        // 올해 기준으로 -1년부터 +5년을 보여준다.
        $(".year").append("<li>모두선택</li>");
        for(let y = (com_year-5); y <= (com_year+5); y++){
            $(".year").append("<li>"+ y + " 년" +"</li>");
        }
        // 월 뿌려주기(1월부터 12월)
        let month;
        $(".month").append("<li>모두선택</li>");
        for(let i = 1; i <= 12; i++){
            $(".month").append("<li>"+ i + " 월" +"</li>");
        }
    }

    // select_box
    const $select = $('.select_box');
    const $selectOpen = $select.find('button');

    //열기버튼을 클릭하면 ul태그 보여주기
    $selectOpen.on('mouseover focus', function () {
        $(this).parent().addClass('on');

        //ul태그에서 마우스가 떠나면 닫아주기 : 마우스 (mouseleave)
        $(this).parent().on('mouseleave', function () {
            $(this).removeClass('on');
        });
    });


    // 버튼태그의 글자 변경
    $select.find('ul li').on('click', function (e) {
        e.preventDefault();
        const tgTxt = $(this).text();
        //열기버튼의 글자를 변경, 포커스 버튼으로 강제 이동
        $(this).parent().prev().text(tgTxt);
        $(this).parent().parent().removeClass('on');
        if($(this).hasClass('on')){
            // $(this).removeClass('on');
        } else{
            $(this).addClass('on').siblings().removeClass('on');
        }
    });

    $(document).on('mouseenter', 'td[aria-describedby="jqGrid_library"], td[aria-describedby="jqGrid_space"]',  function () {
        const edit = $(this).parent('tr').is('[editable = "1"]');
        if(!edit){
            const tooltiptxt = $(this).text();
            console.log(tooltiptxt);
            const child = "" +
                "<div class='tooltips' " +
                "style='" +
                "position: absolute;z-index:1000;background-color: #f3f3f3;" +
                "white-space: normal;max-width: 200px;height: 80px;overflow-y: scroll;padding: 10px;" +
                "border: 1px solid #000;'>"+ tooltiptxt + "</div>" +
                "";
            $(this).append(child);
            $(this).on('mouseleave', function () {
                $(this).children().remove();
            });
        }
    })

});







