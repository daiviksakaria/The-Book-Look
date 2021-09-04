import React, { Component, useState, useEffect } from "react";
import { fire, timestamp } from "../firebase";
import "./howToUse.css";

const HowToUse = () => {
  return (
    <div className="container-md">
      <h3 className="heading-howtouse">How To Use</h3>

      <div className="content-howtouse">
        The Book Look is a peer to peer book sharing system with an aim to share
        resources and exchange knowledge with the entire community. The platform
        helps people to search for the book they want, borrow it or buy it
        according to their convenience as well as sell it or lend it. It reduces
        the hassle of spending a lot of time over finding a book offline.
      </div>
      <br></br>
      <div className="content-howtouse">
        We will start by explaining the pivotal features of the platform and
        then you can explore other things on your own. As soon as you log into
        your account you will see a navigation bar on the left hand side which
        will guide you through everything on the platform. You will probably see
        a lot of books on your screen and those are the ‘users’ books if you are
        a user or your own books in case you are logged into a vendor account.
      </div>
      <br></br>
      <div className="content-howtouse">
        We will now brief you a bit about some of the major features of the
        system.
      </div>
      <br></br>

      <div className="content-howtouse">
        <strong className="subheading-howtouse">Home: </strong>This section
        contains three sub sections which are as follows:
        <ol>
          <li>
            User Books: This section contains the books uploaded by fellow users
            which can be bought or borrowed.
          </li>
          <li>
            Vendor Books: This section contains the books uploaded by vendors
            which can be bought or borrowed on rent basis.
          </li>
          <li>
            My Books: This section contains the books added by the user to the
            system.
          </li>
        </ol>
        All three sections are present for a user while the vendor homepage will
        only show the books uploaded by the particular vendor.
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Add Book: </strong>To add a book
        to the system the you will need to provide the ISBN number of the book.
        Then the system will fetch the book details from the ISBN number.
        Afterwards you will need to fill out other details like the number of
        copies, price of the book or even rent in case of the vendor and then
        press submit. If all the details will be appropriate then the book will
        be added to the system and you will be notified.
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Books: </strong>This section
        contains four subsections as follows:
        <ol>
          <li>
            Books lent: This section shows the collection of books that you have
            lent to other users. Clicking on a book here will redirect to a page
            where the book details as well as details of the users who have
            borrowed this particular book will be found.
          </li>
          <li>
            Books borrowed: This section shows the collection of books that you
            have borrowed from other users as well as vendors. Each individual
            book page will show the details of the book and information about
            the users and vendors who have lent the book.
          </li>
          <li>
            Books sold: This section shows the collection of books that you have
            sold to other users. The details of the book as well as details of
            the buyer, transaction date, price etc will also be shown when a
            book is clicked.
          </li>
          <li>
            Books bought: This section shows the collection of books that you
            have bought from other users and vendors. Each individual book page
            contains information about the seller, date of purchase, price etc
            along with the book details.
          </li>
        </ol>
        All of these sections are available for the user while only Books sold
        and Books lent are shown to a vendor.
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Requests: </strong>The requests
        are divided into three subsections.
        <ol>
          <li>
            My requests: This section shows the requests that you have made to
            other users and vendors. It shows a table containing all the
            requests along with details of the request like book name, date of
            request, copies requested, status of the request etc.
          </li>
          <li>
            Pending requests: This section shows the requests that other users
            have made for a book added by you. The request shows the name of the
            requester, number of copies, duration etc. With every request there
            is an option for you to Accept or Reject the request. As soon as you
            click on either, the request vanishes and you will be notified about
            the action performed.
          </li>
          <li>
            Completed requests: This section shows the requests that you have
            completed. When you accept/reject a request, that request is then
            moved to this section along with its corresponding status.
          </li>
        </ol>
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Add Post: </strong> The Add post
        feature is available for the vendors through which they can notify the
        users about any discount offers or book sale. The Add post button will
        redirect the you to a new page where the vendor will have to add the
        title of the post and content of the post. After successful submission,
        the post will be available to all the users and for you, the posts can
        be viewed under My posts section.
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Discounts: </strong>All the
        posts added by the vendors can be viewed by you in the Discounts
        section. Each post will contain the fields like shop name, name of the
        shop owner, post title, etc
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Chat: </strong>The chat feature
        is available for the users through which they can talk to other users.
        This feature will help you contact other users in case of any query
        regarding their books, transaction, etc.
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Request book: </strong>The
        request book feature allows you to request to another user or vendor for
        a particular book. When you click on a particular book in a collection
        it will redirect to a new page where the book details will be displayed.
        Along with the book details there will be a list of users and vendors
        who possess the book and are willing to sell or lend it. You can look
        into the list and click on the request book button and a popup page will
        appear. The pop-up will display the book details as well as the details
        of the owner of the book. You will then have to fill up some details
        like the duration for which he/she wants the book, number of copies,
        etc. After clicking on the submit button, the system will check the
        availability of the book and a request will be sent to the owner of the
        book with the corresponding details if available.
      </div>
      <br></br>
      <div className="content-howtouse">
        <strong className="subheading-howtouse">Return book: </strong> This
        feature is a two step return process for returning a borrowed or rented
        book. When you visit the profile page of any borrowed/rented book, you
        will get an option to initiate a request to return the book. As soon as
        you click that option, the user or vendor who had lend this book will
        get an option to accept this return request. When the user/vendor
        receives his/her copy back he/she can click on this button and the
        transaction will be marked as complete and the book will be removed from
        the Books Borrowed collection of the borrower and Books Lent collection
        of the lender.
      </div>
      <br></br>
      <div className="content-howtouse">
        These are some of the most common features of the platform and will help
        you get acquainted with the platform. The platform offers a lot more
        features which you can surely explore on your own.
      </div>
    </div>
  );
};

export default HowToUse;
