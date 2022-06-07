import { useEffect } from 'react';
import { connect } from 'react-redux';

const Root = ({ navigation }) => {

  useEffect(() => {
    redirect();
  })
  
  const redirect = () => navigation.navigate('Main')

  return null;
};


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Root);