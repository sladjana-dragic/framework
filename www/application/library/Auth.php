<?php
/**
 * Authorization Library
 */
class Auth{
	//todo:srediti docs za ovaj lib
	private static $entity_object;
	private static $entity_method;
	private static $loginPageUrl;
	private static $return_as_array;
	private static $session_var_name;

	function init(){
		global $_config;
		
		// customize options here
		self::$entity_object = new Model_User();
		self::$entity_method = 'getUser';
		self::$loginPageUrl = Path::urlBase('admin/login');
		self::$return_as_array = true;
		self::$session_var_name = 'AuthLib_user_data_'.md5($_config['application']['salt']);
	}

	static function login( $username, $password )
	{
		//todo:remember me funtionality
		if( isset($username) && isset($password) ){
		
			$data['username'] = $username;
			$data['password_hash'] = self::hash( $password );
			
			$rs = self::$entity_object->{self::$entity_method}( $data );
			
			if( !empty($rs) ) {
				$_SESSION[self::$session_var_name] = $rs;
				return true;
			}
			else{
				sleep(5);
				return false;
			}
			
		}
		else{
			return false;
		}
		
	}
	
	static function check()
	{
		if( !empty( $_SESSION[self::$session_var_name] ) ){
			return true;			
		}
		else{
			return false;			
		}
	}
	
	static function logout()
	{
		unset( $_SESSION[self::$session_var_name] );
		return true;	
	}
	
	static function loginPage( $loginPageUrl = null )
	{
		self::$loginPageUrl = empty($loginPageUrl) ? self::$loginPageUrl : Path::urlBase($loginPageUrl);
		header( "Location: " . self::$loginPageUrl );
		die();
	}
	
	static function hash( $string ){	
		global $_config;
		$salt = isset($_config['application']['salt']) ? $_config['application']['salt'] : '';
		return sha1($salt.$string);	
	}
			
}

Auth::init();

?>