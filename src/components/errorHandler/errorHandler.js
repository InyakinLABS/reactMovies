import {React,Component} from 'react';
import { Alert} from 'antd';
class ErrorHandle extends Component {
   

    render(){
        const {error}=this.props
        return(
            <>
              <br />
              <Alert
                message="Произошла ошибка"
                showIcon
                description={error}
                type="error"
               
              />
              <br />
             
             
            </>
              )
    }
};
export default ErrorHandle;