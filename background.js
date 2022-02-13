chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
   let url = new URL(tabs[0].url);
   let site = url.hostname;
   let prot = url.protocol;
   let time_start = new Date();

   if (prot == "http:" || prot == "https:") {
      const key = "link";
      chrome.storage.sync.get(key, function (val) {

         let array;
         if (val[key]) {
            array = val[key];
         } else {
            array = [];
         }
         let a = -1;
         let k = -1;
         for (let i = 0; i < array.length; i++) {
            let n = array[i].name;
            if (n == site) {
               a = 1;  // указатель на то, что такой хост уже существует (флажок)
               k = i;  // элемент массива, с которым мы работаем
            }
         }
         if (a == -1) {
            array.push({name: site, clicks: 1, time: 0})
         } else {
            array[k].clicks = array[k].clicks + 1;
         }


         val[key] = array;
         console.log(val[key]);
         chrome.storage.sync.set(val);
         console.log(val[key]);
      })
   }
})