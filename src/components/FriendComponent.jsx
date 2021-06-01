import React from "react";
import Grid from "@material-ui/core/Grid";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const FriendComponent = ({ friend, starAction, deleteAction }) => (
  <>
    <div className="h-20">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <strong>{friend.fName} </strong><br></br>
          <small> is your friend </small>
        </Grid>
        <Grid item xs={3}>
          {friend.fav ? (
            <div
              onClick={() => starAction(friend.id, false)}
              className="text-center element"
            >
              <StarIcon />
            </div>
          ) : (
            <div
              onClick={() => starAction(friend.id, true)}
              className="text-center element"
            >
              <StarBorderIcon />
            </div>
          )}
        </Grid>
        <Grid item xs={3}>
          <div
            onClick={() => deleteAction(friend.id)}
            className="text-center element"
          >
            <DeleteOutlineIcon />
          </div>
        </Grid>
      </Grid>
    </div>
  </>
);

export default FriendComponent;
