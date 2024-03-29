$(document).ready(function(){
    $('header').load('include/header.html', function(){
        $('html').click(function(e) {
            console.log(e.target)
    
            if (!$(e.target).hasClass('choice')) {
                $('.language').hide();
            }
            if (!$(e.target).hasClass('title')) {
                $('.title_list').slideUp();
        
            }
        });
        
        $('.lang').click(function(e) {
            $('.language').toggle();
            return false
        });
    
        $('.language li').click(function(){
            let langChoice = $(this).text();
            $('.choice').text(langChoice);
        });
    
        $('header h1 img').mouseover(function(){
            $(this).attr('src','/images/logo_o.png')
        });
        $('header h1 img').mouseout(function(){
            $(this).attr('src','/images/logo.png')
        });
    
        // 한번에 나오게
        // $('.gnb').mouseover(function(){
        //     $('.lnb').stop().fadeIn();
        // })
        // $('.gnb').mouseout(function(){
        //     $('.lnb').stop().fadeOut()
        // })
    
        //mouseenter, mouseleave (본인만), 
        //mouseover, mouseout (자식도),  
    
        //한개씩 나오게
        $('.gnb li').mouseover(function(){
            $(this).find('.lnb').stop().fadeIn(200)
        });
    
        $('.gnb li').mouseout(function(){
            $('.lnb').stop().fadeOut(200)
        })
    
    
    
    
    
        let navTop = $('header nav').offset().top
    
        $(window).scroll(function(){
            let scrT = $(window).scrollTop();
            console.log(scrT)
    
            $('#visual').css({backgroundSize:100+scrT/10+'%'});
            $('#visual .model').css({top:100-scrT/5+'px'});
    
            if(scrT >= navTop){
                $('header nav').addClass('on')
            } else {
                $('header nav').removeClass('on')
            }
        });



        // 현재페이지 표시 스크립트
        let url = window.location.href;


        $('.gnb a').each(function(){
            let gnbText = $(this).text();
            $(this).html('<span>'+gnbText+'</span>')
        })


        

        $('.gnb a').each(function(){
            let gnbHref = $(this).attr('href');   //sub01_01.html
            
            if(url.indexOf(gnbHref) > -1){
                $(this).css({color:'red'});
                $(this).parent('li').addClass('on');

                let gnbHtml = $(this).parents('.lnb').html();
                let h2Text = $(this).text();
                let gnbPage = $(this).parents('.lnb').siblings('a').text();
                let gnbEng = $(this).parents('.lnb').siblings('a').attr('data-eng')
                //찾은 a의 할아버지 lnb의 형제 a에 들어있는 글자
                
                $('#visual_sub .text strong').text(gnbPage)
                $('#visual_sub .text p').text(gnbEng)

                $('.snb').html(gnbHtml);
                $('#content_box h2').text(h2Text);
            }
        })


        function snbAction(){
            let snbOnW = $('.snb li.on span').width()
            let snbOnL = $('.snb li.on span').position().left
            $('.snb_box .line').css({left:snbOnL, width:snbOnW})
        }
        
        snbAction();
        
        $(window).resize(function(){
            snbAction();
        });
        
        
        /* snb */
        $('.snb li').mouseenter(function(){
            let snbLiW = $(this).find('span').width();
            let snbLiL = $(this).find('span').position().left;

            $('.snb_box .line').css({left:snbLiL, width:snbLiW})
        });
        $('.snb').mouseleave(function(){
            snbAction();
        });
    });

    
    


    /* notice 롤링 */
    // let kkk = setInterval(함수, 반복시간)
    // clearInterval(kkk)

    // let mmm = setTimeout(함수, 예약시간)
    // clearTimeout(mmm)

    // let notiRoll = setInterval(noticeRolling, 1000)
    
    // function noticeRolling(){
    //     $('.notice ul').animate({top:'-100%'}, function(){
    //         $('.notice ul li').eq(0).appendTo($('.notice ul'))
    //         $('.notice ul').css({top:0})
    //     })
    // }

    // $('.notice').mouseenter(function(){
    //     clearInterval(notiRoll)
    // });
    // $('.notice').mouseleave(function(){
    //     notiRoll = setInterval(noticeRolling, 2000)
    // })



    let notiRoll;
    let interval = 1000; // 초기 간격 설정

    function startNoticeRolling() {
        notiRoll = setInterval(noticeRolling, interval);
    }

    function noticeRolling() {
        $('.notice ul').animate({ top: '-100%' }, function () {
            $('.notice ul li').eq(0).appendTo($('.notice ul'))
            $('.notice ul').css({ top: 0 })
        })
    }

    $('.notice').mouseenter(function () {
        clearInterval(notiRoll);
    });

    $('.notice').mouseleave(function () {
        startNoticeRolling(); // 이전 간격 설정을 유지하고 다시 시작
    });

    $(document).on('visibilitychange', function () {
        if (document.visibilityState === 'visible') {
            // 브라우저가 다시 활성화되면 현재 간격으로 애니메이션을 다시 시작
            startNoticeRolling();
        } else {
            // 브라우저가 비활성화되면 애니메이션을 일시 중지
            clearInterval(notiRoll);
        }
    });

    // 초기 애니메이션 시작
    startNoticeRolling();
    


    /* 메인section5 번호넣기 방법1  for문 */
    // for(i=0; i<9; i++){
    //     $('#section5 li').eq(i).find('span.num').text('0'+(i+1))

    //     //li들중 몇번째(eq)에 들어있는 자손 .num을 찾아서  글씨를 써라
    // }

    

    /* 메인section5 번호넣기 방법2  each() */
    // $('#section5 li').each(function(){
    //     let liIndex = $(this).index()
    //     $(this).find('.num').text('0'+(liIndex+1))
    // });

    /* 메인section5 번호넣기 방법3  each() */
    $('#section5 li').each(function(index, item){
        if(index+1 < 10){
            $(item).find('.num').text('0'+(index+1))
        } else {
            $(item).find('a').append('<span class="num">'+(index+1)+'</span>')
            // $(item).find('.num').text(index+1)
        }
    });

    /*로그인페이지 현제페이지 표시*/
    let url = window.location.href

     $('.member a').each(function(){
        let memHref = $(this).attr('href');

        if(url.indexOf(memHref) > -1){
            $(this).css({color:'green'}).parent('li').addClass('on')
            let memH2 = $(this).text()
            $('#content_box h2').text(memH2)
        } else if(url.indexOf('join') > -1){
            $('.member a').eq(2).css({color:'green'}).parent('li').addClass('on')
            let memH2 = $('.member a').eq(2).text()
            $('#content_box h2').text(memH2)
        }    
     })

    //  /*로그인 패스워드 눈아이콘*/
    //  $('.eye_on').click(function(){
    //     $(this).hide()
    //     $('.eye_off').show()
    //     $('.login_box input[name=pw]').attr('type', 'text')
    //  })
    //  $('.eye_off').click(function(){
    //     $(this).hide()
    //     $('.eye_on').show()
    //     $('.login_box input[name=pw]').attr('type', 'password')
    //  })


     $('.eye_box').click(function(){
        let $eyeInput = $(this).prev('input')
        $eyeInput.toggleClass('active');

        if($eyeInput.toggleClass('active')){
            $('.eye_off').show()
            $('.eye_on').hide()
            $('.login_box input[name=pw]').attr('type', 'text')

        } else {   
            $('.eye_off').hide()
            $('.eye_on').show()
            $('.login_box input[name=pw]').attr('type', 'password') 
        }
    })
        
    

    /*회원가입페이지 구분*/
    if(url.indexOf('join_people') > -1){
        $('.join_people').show()
    }
    if(url.indexOf('join_company') > -1){
        $('.join_company').show()
    }
    

    /*회원가입 버튼*/ 
    $('.join_ok').click(function(){
       let joinAgree = $('#rule_agree').is(':checked')
        let ruleAgreeTop = $('.rule_box').offset().top;

        if(!joinAgree){
            //alert('이용약관에 동의해 주셔야 합니다.');
            $('html').animate({scrollTop:ruleAgreeTop})
            $('.rule_box label').css({border:'2px dotted crimson'})
            return false
        }
    })

    /*게시판*/
    $('.board_page .title').click(function(){
        $('.title_list').slideToggle(200);
        $('.selectbox').toggleClass('on');

    }); 
    const urlSearch = new URLSearchParams(location.search);
    if(urlSearch.get('board_num') == '01'){
        $('.board_page h2').text('자유게시판')
    };
    
    $('#file_select').change(function() {
        var fileName = $(this).val().split('\\').pop();
        $('.filezone').text(fileName || '파일을 선택해주세요');

        // let fileName = $(this).val()
        // let fileZZo = fileName.split('\\');
        // let fileZZoLength = fileZZo.length

        // $('.filezone').text(fileZZo[ileZZoLength - 1])
    });


});