# Software Studio 2022 Spring Midterm Project

### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Membership Mechanism                             | 15%       | Y         |
| Firebase page                                    | 5%        | Y         |
| Database read/write                              | 15%       | Y         |
| RWD                                              | 15%       | Y         |
| Chatroom                                         | 20%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Using React                                      | 10%       | Y         |
| Third-Party Sign In                              | 1%        | Y         |
| Notification                                     | 5%        | Y         |
| CSS Animation                                    | 2%        | Y         |
| Security                                         | 2%        | Y         |

| **Other useful functions**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of functions                                  | 1~10%     |         |
|User profile                              | 1%        | Y         |
| Unsend message                                          | 3%        | Y         |
    


---

### How to use 

    Describe how to use your web and maybe insert images or gifs to help you explain.D

![](https://i.imgur.com/UoaAAE8.png)![](https://i.imgur.com/9ASj6xJ.png)![](https://i.imgur.com/SZr42GP.png)


預設會進入login頁面，點選signup辦帳號，或是使用已有帳號或是google帳號登入。
登入後進入聊天室，預設聊天室是public，public提供給所有人讀寫。也可以點creatroom創建聊天室，創建後會直接進入創建的聊天室，聊天室是私人的，只有裡面的成員能用email新增其他使用者。
有RWD,能及時讀訊息，有使用react，google登入，css會動，chrome notification，點訊息旁的Delete扭能夠刪除自己任何傳送過的訊息，讀取現在使用者的名稱(User profile)。

輸入時按enter能夠傳送訊息或是登入。跑訊息時會自動滑動滾輪。
### Function description
![](https://i.imgur.com/gOQYhzA.png)

    Describe your bonus function and how to use it.
藉由react製作跳轉頁面，讀寫訊息。
邀請成員，邀請時發生錯誤，創建房間發生錯誤，時會有chrome notification跳出。
在私人房間時會用database判斷房間內是否有該成員來給予讀寫權限。
紀錄push訊息時所產生的key以尋找自己傳送過的訊息，藉由將訊息的值改為空字串來刪除訊息因為讀取時會跳過空字串，不刪除是因為想留下寫過的紀錄。
RWD主要是使用flex相關。


### Firebase page link

    Your web page URL
https://midturn-4f613.web.app/
### Others (Optional)

    Anything you want to say to TAs.
你好。
<style>
table th{
    width: 100%;
}
</style>