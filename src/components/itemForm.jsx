import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getItem, saveItem } from "../services/itemService";

class ItemForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };
  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  };
  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateItem() {
    try {
      const itemId = this.props.match.params._id;
      if (itemId === "new") return;
      const { data: item } = await getItem(itemId);
      this.setState({ data: this.mapToViewModel(item) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateItem();
  }

  mapToViewModel(item) {
    return {
      _id: item._id,
      title: item.title,
      genreId: item.genre._id,
      numberInStock: item.numberInStock,
      dailyRentalRate: item.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    const err = await saveItem(this.state.data);

    this.props.history.push("/items");
  };
  render() {
    return (
      <div>
        <h1>item Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("add")}
        </form>
      </div>
    );
  }
}

export default ItemForm;
