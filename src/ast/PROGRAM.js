const Node = require('../parser/Node')
const ENTITY = require('./ENTITY')
const RELATIONSHIP = require('./RELATIONSHIP')
const Tokenizer = require('../parser/Tokenizer')

class PROGRAM extends Node {
    constructor() {
        super();
        this.entities = [];
        this.relationships = [];
    }

    parse() {
        try {
            while (this.tokenizer.moreToken()) {
                if (this.tokenizer.checkToken("Entity")) {
                    const entity = new ENTITY();
                    entity.parse();
                    this.entities.push(entity);
                }
                if (this.tokenizer.checkToken("Relationship")) {
                    const relationship = new RELATIONSHIP();
                    relationship.parse();
                    this.relationships.push(relationship);
                } 
            }  
        }
        catch (err) {
            throw new Error("Unable to build AST");
        }  
    }

    evaluate() {
        if (this.entities.length != 0) {
            for (let i = 0; i < this.entities.length; i++) {
                this.entities[i].evaluate();
            }
        }
        if (this.relationships.length != 0) {
            for (let i = 0; i < this.relationships.length; i++) {
                this.relationships[i].evaluate();
            }
        }
        // console.log(this.tokenizer.convertMermaidInputToString());
    }
}

// Tokenizer.makeTokenizer("sample.txt");
// const x = new PROGRAM();
// x.parse()
// x.evaluate()
// console.log(Tokenizer.getTokenizer().mermaidInput);

module.exports = PROGRAM;