import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css'
import {Link, withRouter} from 'react-router-dom';

import './App.css';
import { Table } from 'antd';
import "antd/dist/antd.css";
import ParticlesBg from "particles-bg";

// import Navbar from './Navbar';

// import './homePage.css'
import axios from 'axios'




class Model extends Component {
    

    state = {
        dataset : []
    }

    async componentDidMount() {
      console.log("Props: ");
        console.log(this.props.location.pathname);

        const l_host = "http://127.0.0.1:8000";

        try {
            // var res = await axios.get('http://127.0.0.1:8000/');
            var res = await axios.get(l_host+this.props.location.pathname);
            // console.log('fetched raw data', res.data)
            this.setState({
                dataset:res.data
            })
            console.log(this.state.dataset)
        }
        catch(err) {
            console.log(err)
        }
    }

    
    
    render() { 
        console.log("in render");
        let config = {
            num: [4, 7],
            rps: 0.1,
            radius: [5, 40],
            life: [1.5, 3],
            v: [2, 3],
            tha: [-40, 40],
            alpha: [0.6, 0],
            scale: [.1, 0.4],
            position: "all",
            color: ["random", "#ff0000"],
            cross: "dead",
            // emitter: "follow",
            random: 15
          };
      
          if (Math.random() > 0.85) {
            config = Object.assign(config, {
              onParticleUpdate: (ctx, particle) => {
                ctx.beginPath();
                ctx.rect(
                  particle.p.x,
                  particle.p.y,
                  particle.radius * 2,
                  particle.radius * 2
                );
                ctx.fillStyle = particle.color;
                ctx.fill();
                ctx.closePath();
              }
            });
          }
      
          const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
          },
            {
                title: 'Roll Number',
                dataIndex: 'roll_no',
                key: 'roll_no',
            },
            {
                title: "image",
                dataIndex: "image",  // this is the value that is parsed from the DB / server side
                key : "image",
                render: image => <img  src={image}  />,

            },
            {
              title: 'City',
              dataIndex: 'city',
              key: 'city',
            },
      {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
      },
        ];
        console.log(this.state.dataset);
        return (
          <center>
            <div style={{
                display: 'block', width: 700, padding: 30
                    }}>
                      
                        <h4 style={{
                  color: 'white'
                      }}><b><i>Record Level View of Table</i></b></h4>
                        <Table className="table_class" dataSource={this.state.dataset} columns={columns}  />
                        <ParticlesBg type="custom" config={config} bg={true} />  
                        <ParticlesBg type="circle" bg={true}/>
                      
            </div>
            </center>
        );
    }
}
 
export default withRouter(Model);