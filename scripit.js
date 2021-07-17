class Calculator{
    constructor(operadoranterioTextElement,operadoratualTextElement){
        this.operadoranterioTextElement =operadoranterioTextElement
        this.operadoratualTextElement = operadoratualTextElement
        this.limpar()

    }

    limpar(){
        this.operadoratual = ''
        this.operadoranterio = ''
        this.operation = undefined
    }
    deletar(){
        this.operadoratual = this.operadoratual.toString().slice(0, -1)


    }
    numeroescolido(number){
        if(number === '.' &&  this.operadoratual.includes('.'))return 
        this.operadoratual = this.operadoratual.toString() + number.toString()
        
        
    }
    operadorescolido(operation){
        if(this.operadoratual === '') return
        if(this.operadoranterio !== ''){
            this.calcular()
        }
        this.operation =operation 
        this.operadoranterio = this.operadoratual 
        this.operadoratual = ''


    }
    calcular(){
        let calculado
        const anterio = parseFloat(this.operadoranterio)
        const atual = parseFloat(this.operadoratual)
        if(isNaN(anterio) || isNaN(atual)) return
        switch(this.operation){
            case '+':
                calculado = anterio + atual
                break
            case '-':
                calculado = anterio - atual
                break
            case '*':
                calculado = anterio * atual
                break
            case '/':
                calculado = anterio / atual
                break
            default:
                return            

        }
        
        this.operadoratual = calculado
        this.operation =undefined
        this.operadoranterio = ''

    }
    peganumeronatela(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1] 
        const floatNumber = parseFloat(number)
       let integerDisplay 
       if(isNaN(integerDigits)){
           integerDisplay = ''
       }else{
           integerDisplay = integerDigits.toLocaleString('en',{ maximumFractionDigits: 0 })
       }
       if(decimalDigits != null){
           return `${integerDisplay}.${decimalDigits}`
       }else{
           return integerDisplay
       }
    }

    mudanatela(){
        this.operadoratualTextElement.innerText= this.peganumeronatela(this.operadoratual)
        if(this.operation != null){
            this.operadoranterioTextElement.innerText = 
             `${this.peganumeronatela(this.operadoranterio)} ${this.operation}`

        }else{
            this.operadoranterioTextElement.innerText = ''
        }
        
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const igualButtons = document.querySelector('[data-igual]')
const deleteButtons = document.querySelector('[data-deleta]')
const limpaButtons = document.querySelector('[data-limpa]')
const operadoranterioTextElement = document.querySelector('[data-operador-anterio]')
const operadoratualTextElement = document.querySelector('[data-operador-atual]')

const calculadora = new Calculator(operadoranterioTextElement,operadoratualTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click',()=> {
        calculadora.numeroescolido(button.innerText);
        calculadora.mudanatela()

    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',()=> {
        calculadora.operadorescolido(button.innerText);
        calculadora.mudanatela()

    })
})

igualButtons.addEventListener('click', button =>{
    calculadora.calcular()
    calculadora.mudanatela()

} )

limpaButtons.addEventListener('click', button =>{
    calculadora.limpar()
    calculadora.mudanatela()

} )

deleteButtons.addEventListener('click', button =>{
    calculadora.deletar()
    calculadora.mudanatela()

} )