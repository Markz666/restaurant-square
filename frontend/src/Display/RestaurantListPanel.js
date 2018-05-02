import React, { Component } from 'react';

class RestaurantListPanel extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className="RestaurantPanel">
        <table class="table table-striped">
        <caption>条纹表格布局</caption>
        <thead>
          <tr>
            <th>名称</th>
            <th>城市</th>
            <th>邮编</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <img id="restaurant_img" alt=""></img>
            <td>Tanmay</td>
            <td>Bangalore</td>
            <td>560001</td>
          </tr>
          <tr>
            <td>Sachin</td>
            <td>Mumbai</td>
            <td>400003</td>
          </tr>
          <tr>
            <td>Uma</td>
            <td>Pune</td>
            <td>411027</td>
          </tr>
        </tbody>
        </table>
      </div>
    );
  }
}


export default RestaurantListPanel;