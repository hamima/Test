package net.industrialHome.hse.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonAutoDetect;

@JsonAutoDetect
@Entity
@Table(name="protectgoodpost")
public class ProtectGoodPost extends BaseEntity<Long>{

	private Post myPost;
	private ConsumingGoodsGroup consumingGoodGroup;
	private ConsumingGood consumingGood;
	private float number;
	private float repeatDistance;
	
	@Id
	@GeneratedValue
	public Long getId() {
		return id;
	}
	
	@ManyToOne
	public ConsumingGoodsGroup getConsumingGoodGroup() {
		return consumingGoodGroup;
	}
	public void setConsumingGoodGroup(ConsumingGoodsGroup consumingGoodGroup) {
		this.consumingGoodGroup = consumingGoodGroup;
	}
	@ManyToOne
	public ConsumingGood getConsumingGood() {
		return consumingGood;
	}
	public void setConsumingGood(ConsumingGood consumingGood) {
		this.consumingGood = consumingGood;
	}

	@ManyToOne
	public Post getMyPost() {
		return myPost;
	}

	public void setMyPost(Post myPost) {
		this.myPost = myPost;
	}

	public float getNumber() {
		return number;
	}
	public void setNumber(float number) {
		this.number = number;
	}
	public float getRepeatDistance() {
		return repeatDistance;
	}
	public void setRepeatDistance(float repeatDistance) {
		this.repeatDistance = repeatDistance;
	}
}
