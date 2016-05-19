/**
 * Created by Administrator on 2016/5/12.
 */
(function(){
   var payment= document.getElementById("payment"),
       close = document.getElementById("close"),
       sustain = document.getElementById("sustain");
    sustain.addEventListener("click",function(){
        payment.style.display = "block";
    },true);
    close.addEventListener("click",function(){
        payment.style.display = "none";
    },true);
})();
function pay(minus,number,plus,total){
    this.minus = document.getElementById(minus),
    this.number = document.getElementById(number),
    this.plus = document.getElementById(plus),
    this.total =  document.getElementById(total),
    this.reg = /^[1-9]\d*$/,
        this.number_2 = function(){
            if(!this.reg.test(this.number.value)){
                this.number.value = 1 ;
            }
            pay2.total_2();
        }
        this.minus_2 = function(){
            var number = this.number ;
            this.minus.onclick = function(){
               number.value--;
                pay2.total_2();
                pay2.number_2();
            }
        },
        this.minus_3 = function(){
            this.number.onchange = function(){
                pay2.number_2();
            }
        }
        this.plus_2 = function(){
            var number = this.number ;
            this.plus.onclick = function(){
                number.value++;
                pay2.total_2();
                pay2.number_2();
            }
        this.total_2 =function(){
            this.total.innerHTML = this.number.value;
        }
        }
}
var pay2 = new  pay("minus","number","plus","total") ;
(function(){
    pay2.minus_2();
    pay2.plus_2();
    pay2.total_2();
    pay2.number_2();
    pay2.minus_3();
})();