//функция будет возвращать шаблон
function getTemplate (state) {
    return `
    <div class="slider__before" style="width: ${state.width}px;
     background-image: url(${state.before}")>
        <div class="slider__resize" data-type="resize"></div>
    </div>
    <div class="slider__after" 
    style="background-image: url(${state.after}"></div>
    `
}

// конструктор принимает айди слайдера и какое то изначальное состояние
class Slider {
    constructor(selector, state) {
        this.$slider = document.getElementById(selector)
        this.state = {
            ...state,
            width: state.width || 512
        }
        this.#render(this.state)
        this.#listen()
    }
    //рендер помещает шаблон в слайдер
    #render(state) {
        this.$slider.innerHTML = getTemplate(state)
    }
    //апдейт будет менять состояние и вызывать функцию рендер
    #update(props) {
        this.state = {
            ...this.state,
            ...props
        }
        this.#render(this.state)
    }

    //обработка движения ползунка
    //обрабатываем три события: когда лкм зажата, когда отпущенна
    //и когда мы двигаем мышку
    //listen функция добавляет обработчики событий на слайдер

    #listen () {
        this.mouseDownHandler = this.mouseDownHandler.bind(this)
        this.mouseUpHandler = this.mouseUpHandler.bind(this)
        this.moveHandler = this.moveHandler.bind(this)
        this.$slider.addEventListener('mousedown', this.mouseDownHandler)
        this.$slider.addEventListener('mouseup', this.mouseUpHandler)
    }
    mouseDownHandler (event) {
        if(event.target.dataset.type === 'resize') {
            this.$slider.addEventListener('mousemove', this.moveHandler)
            //запоминаем кординату мыши в момент нажатия
            this.currentClientX = event.clientX
        }
    }
    mouseUpHandler () {
        this.$slider.removeEventListener('mousemove', this.moveHandler)
    }
    moveHandler () {
        //от кординаты при нажаттии отнимаем текущую кординату
        let newClientX = this.currentClientX - event.clientX
        this.#update({width: this.state.width-newClientX})
        this.currentClientX = event.clientX
    }
}

//создаем обьект класса
const slider = new Slider('slider', {
    after: './assets/after.jpg',
    before: './assets/before.jpg'
})