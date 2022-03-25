class HelloWorld extends HTMLElement {
  // constructor is called when the element is displayed
  constructor() {
    super();

    // Attach to Shadow DOM
    this.attachShadow({
      mode: "open"
    });

    // Create Template Element with Slot
    let template = document.createElement('template');
    template.innerHTML = `<span><slot name="text"></slot></span>`;

    // Attach
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // Life cycle hook when web component is attached
  // to the DOM
  connectedCallback() {
    console.log('Attached to the DOM');
    this.shadowRoot.querySelector('span')
      .addEventListener('click', this.onClick);
  }

  onClick() {
    this.dispatchEvent(new CustomEvent("hello_clicked", {
      bubbles: true,
      cancelable: false,
      composed: true,  // Break out of the shadow!!! (DOM)
    }));
  }

  // Define Observed Attributes
  static get observedAttributes() {
    return ['color'];
  }

  // Attribute Value Changed
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == 'color') {
      this.shadowRoot.querySelector(
        'span'
      ).style.color = newValue;
    }
  }
}

// make sure that the <hello-world></hello-world>
// or simply <hello-world /> is recognised as this element
customElements.define("hello-world", HelloWorld); 
