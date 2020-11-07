import React, { Component } from "react";
import { toast } from "react-toastify";
import { getItems, deleteItem } from "../services/itemService";
import { getGenres } from "../services/genreService";
import ItemsTable from "./common/itemsTable";
import Pagination from "./common/pagination";
import ListGenre from "./common/listGenre";
import paginate from "../utils/paginate";
import _ from "loadsh";
import SearchBox from "./common/searchBox";
class Items extends Component {
  state = {
    items: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All" }, ...data];
    const { data: items } = await getItems();
    this.setState({ items, genres });
  }

  handleDelete = (item) => {
    const originalItems = this.state.items;
    const items = originalItems.filter((m) => m._id !== item._id);
    this.setState({ items });
    try {
      deleteItem(item._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("this is deleted");
        this.setState({ items: originalItems });
      }
    }
  };

  handleLike = (item) => {
    let items = [...this.state.items];
    const index = items.indexOf(item);
    items[index] = { ...items[index] };
    items[index].liked = !items[index].liked;
    this.setState({ items });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      items: allItems,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filteredItems = allItems;
    if (searchQuery)
      filteredItems = allItems.filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredItems = allItems.filter((m) => m.genre._id === selectedGenre._id);

    const sortedItems = _.orderBy(
      filteredItems,
      [sortColumn.path],
      [sortColumn.order]
    );

    const items = paginate(sortedItems, currentPage, pageSize);

    return { totalCount: filteredItems.length, data: items };
  };

  render() {
    if (this.state.items.length === 0) {
      return <p>there is no Items in the database</p>;
    }

    const { totalCount, data: items } = this.getPagedData();
    return (
      <div className="container ">
        <div className="row">
          <div className="col-3 mt-5">
            <ListGenre
              selectedGenre={this.state.selectedGenre}
              onGenreSelect={this.handleGenreSelect}
              genres={this.state.genres}
            />
          </div>
          <div className="col-9 mt-5">
            {this.props.user && (
              <button
                className="btn btn-primary"
                onClick={() => this.props.history.push("/Items/new")}
              >
                New Item
              </button>
            )}
            <p className="alert alert-primary mt-2">
              there is {totalCount} in the database
            </p>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            ></SearchBox>
            <ItemsTable
              items={items}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLikeToggle={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>{" "}
      </div>
    );
  }
}

export default Items;
