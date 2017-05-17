var React = require('react');
var ListStore = require('../stores/ListStore');
var ButtonActions = require('../actions/ButtonActions');
var MyButton = function (props) {
    var items = props.items;
    var itemHtml = items.map(function (listItem, i) {
        return <li key={i}>{listItem}</li>;
    });

    return <div>
        <ul>{itemHtml}</ul>
        <button onClick={props.onClick}>New Item</button>
    </div>;
};

class MyButtonContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {items: ListStore.getAll()}
        this._onChange=this._onChange.bind(this)
    }

    componentDidMount() {
        ListStore.addChangeListener(this._onChange);
    }

    componentWillUnmount() {
        ListStore.removeChangeListener(this._onChange);
    }

    _onChange() {
        this.setState({
            items: ListStore.getAll()
        });
    }

    createNewItem(event) {
        ButtonActions.addNewItem('new item');
    }

    render() {
        return <MyButton
            items={this.state.items}
            onClick={this.createNewItem}
        />;
    }

}
;

module.exports = MyButtonContainer;
