class App{
	constructor(){
		window.app = this;
		window.addEventListener("load", function(){this.app.init();});
		console.log(window);
	}
	
	init(){
		var w1 = new Window("Titulo de prueba");
		var div1 = document.createElement("div");
		div1.style.backgroundColor = "rgba(9,0,0,0.4)";
		div1.style.width = "300px";
		div1.style.height = "300px";
		w1.elements.content.appendChild(div1);
		document.body.appendChild(w1.mainElement);
	};
}

class AppObject{
	constructor(){
		this.elements = {};
		this.elementList = [];
		this.mainElement = undefined;
		this.alpha = 1;
	}
	
	addElement(element, name){
		element.classList.add("app-element");
        element.appParent = this;
		this.elementList.push(element);
		this.elements[name] = element;
	}
}

class Window extends AppObject{
	constructor(title){
		super();
		this.title = "";
		if(title != undefined){
			this.title = title;
		}
		this.draggin = false;
		this.timeuot = 0;
		this.addElement(document.createElement("div"), "window");
		this.addElement(document.createElement("div"), "title");
		this.addElement(document.createElement("div"), "content");
		
		this.elements.window.classList.add("window");
		this.elements.title.classList.add("title");
		this.elements.content.classList.add("content");
		
		this.elements.window.appendChild(this.elements.title);
		this.elements.window.appendChild(this.elements.content);
		
		this.alpha = 1;
		
		this.elements.window.style.top = "50px";
		this.elements.window.style.left = "50px";
        this.elements.window.style.opacity = this.alpha;
		console.log(this.elements.window.style.backgroundColor);
		this.elements.title.innerText = this.title;
		
        this.elements.title.addEventListener("mousedown", function(){ this.appParent.dragStart();});
        this.elements.title.addEventListener("mouseup", function(){ this.appParent.dragStop();});
		window.addEventListener("mousemove", function(e){
			if(window.dragginObject != undefined){
				window.dragginObject.dragMoving(e);
			}
		});

		this.mainElement = this.elements.window;
	}
	
	dragStart(){
		this.draggin = true;
		window.dragginObject = this;
		this.elements.window.style.opacity = "0.7";
	}
	
	dragStop(){
		this.draggin = false;
		this.elements.window.style.opacity = this.alpha;
	}
	
	dragMoving(e){
		if(this.draggin == true){
			var x = parseInt(this.elements.window.style.left);
			var y = parseInt(this.elements.window.style.top);
			this.elements.window.style.left = (x + e.movementX) + "px";
			this.elements.window.style.top = (y + e.movementY) + "px";
			e.stopPropagation();
		}
	}
	
	
}


function getDimensions(element){
	var tg = document.createElement("div");
	var st = window.getComputedStyle(element);
	tg.className = "otro-div";
	var text = st.width + ", " + st.height;
	text += "<br>client: " + element.clientWidth + ", " + element.clientHeight;
	text += "<br>offset: " + element.offsetWidth + ", " + element.offsetHeight;
	text += "<br>w,h: " + st.width + ", " + st.height;
	text += "<br>m: " + st.marginTop + ", " + st.marginBottom
		+ ", " + st.marginLeft+ ", " + st.marginRight;
	text += "<br>p: " + st.paddingTop + ", " + st.paddingBottom
		+ ", " + st.paddingLeft+ ", " + st.paddingRight;
	text += "<br>b: " + st.borderTopWidth + ", " + st.borderBottomWidth
		+ ", " + st.borderLeftWidth+ ", " + st.borderRightWidth;
		
	tg.innerHTML = text;
	element.appendChild(tg);
}

var app = new App();
