import React, { useEffect, useState } from "react";
import _ from "lodash";
import SortIcon from "@material-ui/icons/Sort";
import TextField from "@material-ui/core/TextField";
import FriendComponent from "./FriendComponent";
import Snackbar from "@material-ui/core/Snackbar";

const List = () => {
  const [originalData, setOriginaldata] = useState([]);
  const [list, setList] = useState([]);
  const [fName, setFrendName] = useState("");
  const [sortStar, setSortStar] = useState(true);

  useEffect(() => {
    if (originalData.length > 4) {
      const pages = _.chunk(originalData, 4);
      setList(pages[0]);
    }
  }, [originalData]);

  const starAction = (id, evnt) => {
    const updatedData = _.map(list, (key) => {
      if (key.id === id) {
        key.fav = evnt;
      }
      return key;
    });
    setList(updatedData);
    setOriginaldata(updatedData);
  };

  const deleteAction = (id) => {
    const updatedData = _.reject(list, { id: id });
    setList(updatedData);
    setOriginaldata(updatedData);
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={true}
      autoHideDuration={4000}
      message="Friend Deleted"
    />;
  };

  const searchAction = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    const searchFriend = _.filter(list, (key) => key.fName.includes(value));
    setList(searchFriend);
    if (_.isEmpty(value)) {
      setList(originalData);
    }
  };

  const createAction = (event) => {
    if (event && event.key === "Enter") {
      if (fName === "" || !/^[a-zA-Z ]*$/.test(fName))
        return (
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={true}
            autoHideDuration={4000}
            message="Invalid Name"
          />
        );
      const newData = [
        { id: (Math.random() * 10000).toFixed(0), fName: fName, fav: false },
      ];
      setList(_.concat(list, newData));
      setOriginaldata(_.concat(list, newData));
      setFrendName("");
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={true}
        autoHideDuration={4000}
        message="Friend Added"
      />;
    }
  };

  const SortByStart = () => {
    if (sortStar) {
      let sortedList = [...list].sort((a, b) => {
        if (a.fav > b.fav) return -1;
        if (a.fav < b.fav) return 1;
      });
      setList(sortedList);
      setSortStar(false);
    } else {
      setSortStar(true);
    }
  };

  const onChangePage = (i) => {
    const pages = _.chunk(originalData, 4);
    setList(pages[i]);
  };

  return (
    <div>
      <div>
        <strong> Friends List </strong>
        <SortIcon onClick={() => SortByStart()} />
      </div>

      <TextField
        value={fName}
        onKeyDown={(e) => createAction(e)}
        className="br-0"
        placeholder={"Enter Friends name"}
        onChange={(e) => setFrendName(e.target.value)}
      />
      <TextField
        defaultValue=''
        className="br-0"
        placeholder={"Search Friends name"}
        onChange={(e) => searchAction(e)}
      />
      {!_.isEmpty(list) &&
        _.map(list, (item) => (
          <FriendComponent
            friend={item}
            starAction={starAction}
            deleteAction={deleteAction}
            key={item.id}
          />
        ))}
      <div>
        {_.chunk(originalData, 4).length > 1 && _.map(_.chunk(originalData, 4), (p, index) => <span key={index} onClick={(e) => onChangePage(index)}>Page {index+1} {' '}</span>)}
      </div>
    </div>
  );
};

export default List;
