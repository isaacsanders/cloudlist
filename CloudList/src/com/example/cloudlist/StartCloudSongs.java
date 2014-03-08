package com.example.cloudlist;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentManager;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.app.ActionBarDrawerToggle;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.AdapterView.OnItemClickListener;

public class StartCloudSongs extends Activity {
    private DrawerLayout mDrawerLayout;
    private ListView mDrawerList;
    private ActionBarDrawerToggle mDrawerToggle;
    
    private CharSequence mDrawerTitle;
    private CharSequence mTitle;
    private String[] mPlanetTitles;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.cloud_list_main);

        mTitle = mDrawerTitle = getTitle();
        mPlanetTitles = getResources().getStringArray(R.array.options_array);
        mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
        mDrawerList = (ListView) findViewById(R.id.left_drawer);

        // set a custom shadow that overlays the main content when the drawer opens
        mDrawerLayout.setDrawerShadow(R.drawable.drawer_shadow, GravityCompat.START);
        // set up the drawer's list view with items and click listener
        mDrawerList.setAdapter(new ArrayAdapter<String>(this,
                R.layout.drawer_list_item, mPlanetTitles));
        mDrawerList.setOnItemClickListener(new DrawerItemClickListener());

        // enable ActionBar app icon to behave as action to toggle nav drawer
        getActionBar().setDisplayHomeAsUpEnabled(true);
        getActionBar().setHomeButtonEnabled(true);

        // ActionBarDrawerToggle ties together the the proper interactions
        // between the sliding drawer and the action bar app icon
        mDrawerToggle = new ActionBarDrawerToggle(
                this,                  /* host Activity */
                mDrawerLayout,         /* DrawerLayout object */
                R.drawable.ic_drawer,  /* nav drawer image to replace 'Up' caret */
                R.string.drawer_open,  /* "open drawer" description for accessibility */
                R.string.drawer_close  /* "close drawer" description for accessibility */
                ) {
            public void onDrawerClosed(View view) {
                getActionBar().setTitle(mTitle);
                invalidateOptionsMenu(); // creates call to onPrepareOptionsMenu()
            }

            public void onDrawerOpened(View drawerView) {
                getActionBar().setTitle(mDrawerTitle);
                invalidateOptionsMenu(); // creates call to onPrepareOptionsMenu()
            }
        };
        mDrawerLayout.setDrawerListener(mDrawerToggle);

        if (savedInstanceState == null) {
            selectItem(2);
        }
        
        MainContentFragment.context = StartCloudSongs.this;
        
        

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.cloud_list_main, menu);
        return super.onCreateOptionsMenu(menu);
    }

    /* Called whenever we call invalidateOptionsMenu() */
    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        return super.onPrepareOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
         // The action bar home/up action should open or close the drawer.
         // ActionBarDrawerToggle will take care of this.
        if (mDrawerToggle.onOptionsItemSelected(item)) {
            return true;
        }
        // Handle action buttons
        switch(item.getItemId()) {
        default:
            return super.onOptionsItemSelected(item);
        }
    }

    /* The click listner for ListView in the navigation drawer */
    private class DrawerItemClickListener implements ListView.OnItemClickListener {
        @Override
        public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
            selectItem(position);
        }
    }

    private void selectItem(int position) {
        // update the main content by replacing fragments
        Fragment fragment = new MainContentFragment();
        Bundle args = new Bundle();
        args.putInt(MainContentFragment.ARG_OPTION_NUMBER, position);
        fragment.setArguments(args);

        FragmentManager fragmentManager = getFragmentManager();
        fragmentManager.beginTransaction().replace(R.id.content_frame, fragment).commit();

        // update selected item and title, then close the drawer
        mDrawerList.setItemChecked(position, true);
        setTitle(mPlanetTitles[position]);
        mDrawerLayout.closeDrawer(mDrawerList);
    }

    @Override
    public void setTitle(CharSequence title) {
        mTitle = title;
        getActionBar().setTitle(mTitle);
    }

    /**
     * When using the ActionBarDrawerToggle, you must call it during
     * onPostCreate() and onConfigurationChanged()...
     */

    @Override
    protected void onPostCreate(Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        // Sync the toggle state after onRestoreInstanceState has occurred.
        mDrawerToggle.syncState();
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        // Pass any configuration change to the drawer toggls
        mDrawerToggle.onConfigurationChanged(newConfig);
    }
    
    
    /**
     * Fragment that appears in the "content_frame", shows a planet
     */
    public static class MainContentFragment extends Fragment implements OnCompletionListener, SeekBar.OnSeekBarChangeListener{
        public static final String ARG_OPTION_NUMBER = "option_number";
        public static boolean firstLoad = true;
        public static Context context = null; 
        ListView listView;
        ArrayList<String> songList;
        private SongsManager songManager;
        private SeekBar songProgressBar;
        private  MediaPlayer mp;
        private ArrayList<HashMap<String, String>> songsList = new ArrayList<HashMap<String, String>>();
        private TextView songLabel;
        private Handler mHandler = new Handler();
        private SongUtilities utils;
        private int currentSongIndex = 0;
        
        public MainContentFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                Bundle savedInstanceState) {
        	View rootView = inflater.inflate(R.layout.start_cloud_songs, container, false);
        	listView = (ListView) rootView.findViewById(R.id.songs_list);
        	songLabel = (TextView)rootView.findViewById(R.id.tv_song_name1);
        	
        	songProgressBar = (SeekBar) rootView.findViewById(R.id.songProgressBar);
        	songProgressBar.setOnSeekBarChangeListener(this);
        	
        	mp = new MediaPlayer();
    		songManager = new SongsManager();
    		utils = new SongUtilities();
    		
    		mp.setOnCompletionListener(this);
    		songsList = songManager.getPlayList();
    		
    		this.songList = new ArrayList<String>();
    		for (int i=0; i<this.songsList.size(); i++){
    			this.songList.add(songsList.get(i).get("songTitle"));
    		}
    		
    		listView.setAdapter(new SongListAdapter(context, this.songList));
    		listView.setItemsCanFocus(false);
    		
    		playSong(0);
    		
    		listView.setOnItemClickListener(new OnItemClickListener() {

    			@Override
    			public void onItemClick(AdapterView<?> parent, View view,
    					int position, long id) {
    				// getting listitem index
    				playSong(position);
    			}
    		});
    		
            int i = getArguments().getInt(ARG_OPTION_NUMBER);
            String option = getResources().getStringArray(R.array.options_array)[i];
            
            if(!firstLoad)
            {
	            if (option.equals("Home"))
	            {
	            	Intent intent = new Intent(context, CloudListMain.class);
	            	getActivity().finish();
	            	startActivity(intent);
	            }
	            else if (option.equals("Start Cloud"))
	            {
	            	Intent intent = new Intent(context, StartCloud.class);
	            	getActivity().finish();
	            	startActivity(intent);
	            }
	            else if (option.equals("Join Cloud"))
	            {
	            	Intent intent = new Intent(context, JoinCloud.class);
	            	getActivity().finish();
	            	startActivity(intent);
	            }
            }else
            	firstLoad = false;
            
            return rootView;
        }
        
        public void  playSong(int songIndex){
    		// Play song
    		try {
            	mp.reset();
    			mp.setDataSource(songsList.get(songIndex).get("songPath"));
    			mp.prepare();
    			mp.start();
    			// Displaying Song title
    			String songTitle = songsList.get(songIndex).get("songTitle");
    			songLabel.setText(songTitle);
    			
    			// set Progress bar values
    			songProgressBar.setProgress(0);
    			songProgressBar.setMax(100);
    			
    			// Updating progress bar
    			updateProgressBar();			
    		} catch (IllegalArgumentException e) {
    			e.printStackTrace();
    		} catch (IllegalStateException e) {
    			e.printStackTrace();
    		} catch (IOException e) {
    			e.printStackTrace();
    		}
    	}
        
        public void updateProgressBar() {
            mHandler.postDelayed(mUpdateTimeTask, 100);        
        }
        
        private Runnable mUpdateTimeTask = new Runnable() {
 		   public void run() {
 			   long totalDuration = mp.getDuration();
 			   long currentDuration = mp.getCurrentPosition();
 			  
 			   // Updating progress bar
 			   int progress = (int)(utils.getProgressPercentage(currentDuration, totalDuration));
 			   //Log.d("Progress", ""+progress);
 			   songProgressBar.setProgress(progress);
 			   
 			   // Running this thread after 100 milliseconds
 		       mHandler.postDelayed(this, 100);
 		   }
 		};
        
        @Override
    	public void onProgressChanged(SeekBar arg0, int arg1, boolean arg2) {
    	}

    	@Override
    	public void onStartTrackingTouch(SeekBar arg0) {
    		mHandler.removeCallbacks(mUpdateTimeTask);
    	}

    	@Override
    	public void onStopTrackingTouch(SeekBar seekBar) {
    		mHandler.removeCallbacks(mUpdateTimeTask);
    		int totalDuration = mp.getDuration();
    		int currentPosition = utils.progressToTimer(seekBar.getProgress(), totalDuration);
    		
    		// forward or backward to certain seconds
    		mp.seekTo(currentPosition);
    		
    		// update timer progress again
    		updateProgressBar();
    	}

    	@Override
    	public void onCompletion(MediaPlayer arg0) {
    		if(currentSongIndex < (songsList.size() - 1)){
				playSong(currentSongIndex + 1);
				currentSongIndex = currentSongIndex + 1;
			}else{
				// play first song
				playSong(0);
				currentSongIndex = 0;
			}
    	}
        
    }

	
}