/*const pizza = false;
function pizzaReady(){
    return new Promise((resolve) => {
        setTimeout(()=>{if (pizza === true)
            resolve('pizza done')
        else {
            console.log('pizza burned')
        }},1000)
    })
}
pizzaReady().then((ans)=>{
    console.log(ans);
})
.catch((e)=>{
    console.log(e)
})
console.log('waiting for pizza')


async function pizzaRead(){try{
    const ready = await new Promise((resolve,reject) => {
        setTimeout(()=>{if (pizza === true)
            resolve('pizza done')
            else {
            reject('pizza burned')
        }},1000)
    })
    console.log(ready)
}
catch(e){
    console.log(e)
}

}
pizzaRead();


*/