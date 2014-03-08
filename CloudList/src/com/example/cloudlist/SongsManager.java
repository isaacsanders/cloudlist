package com.example.cloudlist;

import android.annotation.SuppressLint;
import java.io.File;
import java.io.FilenameFilter;
import java.util.ArrayList;
import java.util.HashMap;

public class SongsManager {
	// SDCard Path
	@SuppressLint("SdCardPath")
	final String MEDIA_PATH = new String("/sdcard/Music/");
	private ArrayList<HashMap<String, String>> songsList = new ArrayList<HashMap<String, String>>();
	
	// Constructor
	public SongsManager(){
		
	}
	
	/**
	 * Function to read all mp3 files from sdcard
	 * and store the details in ArrayList
	 * */
	public ArrayList<HashMap<String, String>> getPlayList(){
		File home = new File(MEDIA_PATH);
		FileExtensionFilter filter = new FileExtensionFilter();
		File[] listOfFiles = home.listFiles(filter);
		if (listOfFiles.length > 0) {
			for (File file : listOfFiles) {
				HashMap<String, String> song = new HashMap<String, String>();
				song.put("songTitle", file.getName().substring(0, (file.getName().length() - 4)));
				song.put("songPath", file.getPath());
				
				// Adding each song to SongList
				songsList.add(song);
			}
		}
		// return songs list array
		return songsList;
	}
	
	public static boolean isSdPresent() 
	{
	    return android.os.Environment.getExternalStorageState().equals(
	                android.os.Environment.MEDIA_MOUNTED);
	}
	
	/**
	 * Class to filter files which are having .mp3 extension
	 * */
	class FileExtensionFilter implements FilenameFilter {
		public boolean accept(File dir, String name) {
			return (name.endsWith(".mp3") || name.endsWith(".MP3"));
		}
	}
}
