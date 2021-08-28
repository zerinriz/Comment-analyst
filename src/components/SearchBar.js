import React from "react";
import { Form, Input } from "semantic-ui-react";

class SearchBar extends React.Component {
  state = { title: "" };

  onSearchChanged = (event) => {
    const _title = event.target.value;
    this.setState({ title: _title });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.title);
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.onSubmit} className="search-form">
          <Input
            icon="search"
            size="huge"
            id="video-search"
            type="text"
            value={this.state.title}
            onChange={this.onSearchChanged}
            placeholder="Search"
          />
        </Form>
      </div>
    );
  }
}

export default SearchBar;
