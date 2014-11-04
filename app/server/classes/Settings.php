<?php
class Settings {
	private   static $_instance;
	protected static $_settings;
	
	private function __construct() {
		#global $LANG;
		if (file_exists(SETTINGS_FILE)) { 
    		self::$_settings = parse_ini_file (SETTINGS_FILE, true);			
		} else {
			die(SETTINGS_FILE." does not exist.  Aborting ....\n");
		}
	}
	public function get($var) {
		if (!isset(self::$_instance)) {
			$c = __CLASS__;
			self::$_instance = new $c();
		}
    	$var = explode('.', $var);
        $result = self::$_settings;
	    foreach ($var as $key) {
    	    if (!isset($result[$key])) { return false; }
        	$result = $result[$key];
    	}
        return $result;
    } 		
}