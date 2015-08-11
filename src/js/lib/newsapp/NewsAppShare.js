/**
 * Created by GG on 15/8/8.
 */

(function (win, doc) {
    win.NewsAppShare = {
        shareData: {
            title: '',
            desc: '',
            img_url: '',
            link: ''
        },
        update: function (data) {
            for (var i in data) {
                if (this.shareData.hasOwnProperty(i)) {
                    this.shareData[i] = data[i];
                }
            }
            doc.getElementById('__newsapp_sharetext').innerHTML = this.shareData.title + ' ' + this.shareData.link;
            doc.getElementById('__newsapp_sharephotourl').innerHTML = this.shareData.img_url;
            doc.getElementById('__newsapp_sharewxtitle').innerHTML = this.shareData.title;
            doc.getElementById('__newsapp_sharewxtext').innerHTML = this.shareData.desc;
            doc.getElementById('__newsapp_sharewxthumburl').innerHTML = this.shareData.img_url;
            doc.getElementById('__newsapp_sharewxurl').innerHTML = this.shareData.link;
        },
        show: function () {
            if (NewsAppClient.isNewsApp()) {
                NewsAppClient.share();
            } else {
                var commonShare = doc.getElementById('common-share');
                commonShare.style.display = 'block';
                setTimeout(function () {
                    commonShare.style.display = 'none';
                }, 2000);
            }
        }
    };

    //初始化
    doc.addEventListener('DOMContentLoaded', function () {
        NewsAppShare.update({
            title: '分享标题',
            desc: '分享描述',
            img_url: getAbsPath('img/share-icon.png'),
            link: getAbsPath('')
        });

        function getAbsPath(url) {
            var a = doc.createElement('a');
            a.href = url;
            return a.href;
        }
    });

    //微信
    doc.addEventListener('WeixinJSBridgeReady', function () {
        WeixinJSBridge.on('menu:share:timeline', function () {
            WeixinJSBridge.invoke('shareTimeline', NewsAppShare.shareData, function () {
            });
        });
        WeixinJSBridge.on('menu:share:appmessage', function () {
            WeixinJSBridge.invoke('sendAppMessage', NewsAppShare.shareData, function () {
            });
        });
    }, false);
}(window, document));