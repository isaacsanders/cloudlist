package com.example.cloudlist;

import java.util.ArrayList;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;





public class SongListAdapter extends BaseAdapter {

	Context context;
	ArrayList<String> data;
	private static LayoutInflater inflater = null;
	
	public SongListAdapter(Context context, ArrayList<String> data){
		this.context = context;
        this.data = data;
        inflater = (LayoutInflater) context
                .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	}
	
	@Override
	public int getCount() {
		return data.size();
	}

	@Override
	public Object getItem(int position) {
		return data.get(position);
	}

	@Override
	public long getItemId(int position) {
		return position;
	}

	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		if (convertView == null)
			convertView = inflater.inflate(R.layout.song_row, null);
		TextView songName = (TextView)convertView.findViewById(R.id.tv_song_name);
		songName.setText(data.get(position));
		TextView songNum = (TextView)convertView.findViewById(R.id.tv_song_number);
		songNum.setText(""+(position+1));
		return convertView;
	}
    
}