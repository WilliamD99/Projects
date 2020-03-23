import React, { Component } from "react";
import { Icon } from "rsuite";
import dateFormat from "../helpers/dateFormat";
import CommentBox from "./CommentBox";

export default class Bone extends Component {
    //Init page buttons
    pageNum = num => {
        let numberOfPage = [];
        for (let i = 1; i <= num; i++) {
            let page = (
                <button
                    className="page-link pagination"
                    id="pagination"
                    onClick={this.handlePage}
                    key={i}
                    name={i - 1}
                >
                    {i}
                </button>
            );
            numberOfPage.push(page);
        }
        return numberOfPage;
    };
    //Handle page
    handlePage = event => {
        const target = event.target;
        if (target.classList.value.indexOf("pagination") === -1) {
            target.classList.add("pagination");
        } else {
            target.classList.remove("pagination");
        }
        this.props.controller(target.name);
    };
    pagination = length => {
        if (length > 1) {
            return <nav>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a
                            className="page-link"
                            aria-label="Previous"
                            href="https://www.google.com"
                        >
                            <span aria-hidden="true">«</span>
                            <span className="sr-only">Previous</span>
                        </a>
                    </li>
                    {this.pageNum(this.props.length)}
                    <li className="page-item">
                        <a
                            className="page-link"
                            aria-label="Next"
                            href="https://www.google.com"
                        >
                            <span aria-hidden="true">»</span>
                            <span className="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        }
    }
    render() {
        let data = this.props.data;
        let contents = data.map((content, index) => (
            <section className="hero" key={index}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="cardbox shadow-lg bg-white">
                                <div className="cardbox-heading">
                                    <div className="media">
                                        <div className="d-flex mr-3">
                                            <img
                                                className=" rounded-circle avatar"
                                                src={content.owner.avatar_url}
                                                alt="User"
                                            />
                                        </div>
                                        <div className="media-body">
                                            <p className="m-0">{content.owner.login}</p>
                                            <small>
                                                <span>
                                                    <Icon icon="code-fork" className="forks" />
                                                    {content.forks.toLocaleString()}
                                                </span>
                                            </small>
                                            <small>
                                                <span>
                                                    <Icon icon="people-group" className="watchers" />
                                                    {content.watchers.toLocaleString()}
                                                </span>
                                            </small>
                                            <span className="badge badge-warning float-right">
                                                {content.language ? content.language : "None"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="cardbox-item">
                                    <div className="card-body">
                                        <a href={content.html_url}>
                                            <h5 className="card-title">{content.name}</h5>
                                        </a>
                                        <p className="card-text">{content.description}</p>
                                        <div className="related-date">
                                            <small>
                                                <span className="m=0 float-right">
                                                    <Icon icon="cloud-upload" className="upload" />
                                                    {dateFormat(content.created_at)}
                                                </span>
                                            </small>
                                            <small>
                                                <span className="m=0 float-right">
                                                    <Icon icon="edit2" className="edit" />
                                                    {dateFormat(content.updated_at)}
                                                </span>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <CommentBox ava={this.props.ava[0].value} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        ));
        return <>
            {contents}
            {this.pagination(this.props.length)}
        </>;
    }
}