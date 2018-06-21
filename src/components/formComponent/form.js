import React from "react";

// Components
import { InputKeyValue } from "./../inputComponent";

export default class Form extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            attributes: [],
            id: 0,
            baseURLScheme: "",
            url: ""
        };
        this.addAttribute = this.addAttribute.bind(this);
        this.deleteAttribute = this.deleteAttribute.bind(this);
        this.updateAttribute = this.updateAttribute.bind(this);
        this.generateURLScheme = this.generateURLScheme.bind(this);
    }

    addAttribute (e) {
        e.preventDefault();
        const newAttribute = {id: this.state.id, key: "", value: ""};
        let id = this.state.id + 1;
        let attributes = [...this.state.attributes, newAttribute];
        this.setState({
            id,
            attributes
        });
    }

    deleteAttribute (id) {
        let _state = [];
        for (var i = 0; i < this.state.attributes.length; i++) {
            if (this.state.attributes[i].id === id) {
                delete this.state.attributes[i];
                continue;
            }
            _state.push(this.state.attributes[i]);
        }
        this.setState({attributes: _state});
    }

    updateAttribute (index, newKey, newValue) {
        const newState = [...this.state.attributes];
        newState[index] = { ...newState[index], id: newState[index].id, key: newKey, value: newValue };
        this.setState({
            attributes: newState
        });
    }

    getInputOfType (attribute, index, type = "default") {
        let component;
        switch (type) {
        default:
            component = (
                <InputKeyValue
                    // attributes
                    attrId={attribute.id}
                    attrKey={attribute.key}
                    attrValue={attribute.value}
                    index={index}
                    // functions
                    deleteAttribute={this.deleteAttribute}
                    updateAttribute={this.updateAttribute}
                />
            );
            break;
        }
        return component;
    }

    change (e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    generateURLScheme () {
        if (this.state.baseURLScheme === "") {
            return alert("Preencha o campo Base URL Scheme para gerar a url");
        }
        let urlScheme = this.state.baseURLScheme + "://";
        for (var i = 0; i < this.state.attributes.length; i++) {
            if (this.state.attributes[i].value === "" || this.state.attributes[i].key === "") {
                continue;
            }
            urlScheme += this.state.attributes[i].key + "=" + this.state.attributes[i].value;
            if (i < this.state.attributes.length - 1) {
                urlScheme += "/";
            }
        }
        this.setState({
            url: urlScheme
        });
    }

    render () {
        return (
            <div>
                Base URL Scheme <input
                    name="baseURLScheme"
                    placeholder="Base URL Scheme"
                    value={this.state.baseURLScheme}
                    onChange={(e) => this.change(e)}
                />
                <button onClick={(e) => this.addAttribute(e)}>Add Attribute</button>
                {this.state.attributes.map((attr, index) => {
                    return (
                        <div key={attr.id}>
                            {this.getInputOfType(attr, index)}
                        </div>
                    );
                })}
                <button onClick={this.generateURLScheme}> Generate URL Scheme </button>
                <br/>
                {this.state.url}
            </div>
        );
    }
}