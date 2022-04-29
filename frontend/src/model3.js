import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.css'
import {Link, withRouter} from 'react-router-dom';

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
        console.log("in cdm");
        try {
            // var res = await axios.get('http://127.0.0.1:8000/');
            var res = await axios.get('http://127.0.0.1:8000/dfs_app_dfs_model_covid');
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
              title: 'Timestamp',
              dataIndex: 'timestamp',
              key: 'timestamp',
          },
            {
                title: 'patient_id',
                dataIndex: 'patient_id',
                key: 'patient_id',
            },
            {
            title: 'Sample_id',
            dataIndex: 'sample_id',
            key: 'sample_id',
        },
        {
          title: 'Country',
          dataIndex: 'country',
          key: 'country',
      },
      {
        title: 'Site_id',
        dataIndex: 'site_id',
        key: 'site_id',
      },
        ];
        console.log("Cool");
        return (
            
            <div style={{
                display: 'block', width: 700, padding: 30
                    }}>
                      <h4 style={{
                color: 'white'
                    }}>Record Level View of Table</h4>
                      <Table dataSource={this.state.dataset} columns={columns}  />
                      <ParticlesBg type="custom" config={config} bg={true} />  
                      <ParticlesBg type="circle" bg={true}/>
            </div>
        );
    }
}
 
export default withRouter(Model);